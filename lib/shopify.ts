// lib/shopify.ts
//
// Sirf server-side use karna (API routes, server actions). Kabhi bhi
// client component me import mat karna — warna secrets browser me chale jayenge.

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN as string
const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID as string
const SHOPIFY_CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET as string
const SHOPIFY_API_VERSION = '2026-01'

if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_CLIENT_ID || !SHOPIFY_CLIENT_SECRET) {
  console.warn(
    '[shopify] Env vars missing: SHOPIFY_STORE_DOMAIN, SHOPIFY_CLIENT_ID, SHOPIFY_CLIENT_SECRET. .env.local check karo.'
  )
}

// Token 24 ghante ke liye valid hota hai, is liye memory me cache kar rahe
// hain taake har request pe dobara na mangna pare.
let cachedToken: { token: string; expiresAt: number } | null = null

async function getAccessToken(): Promise<string> {
  // Agar cached token abhi bhi kam se kam 1 minute valid hai, wahi use karo
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.token
  }

  const res = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: SHOPIFY_CLIENT_ID,
      client_secret: SHOPIFY_CLIENT_SECRET,
      grant_type: 'client_credentials',
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Shopify token exchange failed: ${res.status} ${text}`)
  }

  const data = await res.json()

  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  }

  return cachedToken.token
}

// Admin API ko GraphQL query bhejne ka generic helper
export async function shopifyAdminFetch<T = any>(
  query: string,
  variables: Record<string, any> = {}
): Promise<T> {
  const token = await getAccessToken()

  const res = await fetch(
    `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    }
  )

  const json = await res.json()

  if (json.errors) {
    throw new Error(`Shopify GraphQL error: ${JSON.stringify(json.errors)}`)
  }

  return json.data as T
}

// Ek product (legacyResourceId) ka pehla variant nikalta hai — order create
// karte waqt Shopify ko variant ID aur current price/stock chahiye hota hai
export async function getProductVariant(productLegacyId: string) {
  const gid = `gid://shopify/Product/${productLegacyId}`

  const data = await shopifyAdminFetch<any>(
    `
    query GetVariant($id: ID!) {
      product(id: $id) {
        title
        variants(first: 1) {
          edges {
            node {
              id
              price
              inventoryQuantity
            }
          }
        }
      }
    }
  `,
    { id: gid }
  )

  const variant = data.product?.variants?.edges?.[0]?.node
  if (!variant || !data.product) return null

  return {
    productTitle: data.product.title as string,
    variantId: variant.id as string,
    price: Number(variant.price),
    stock: variant.inventoryQuantity as number,
  }
}

// Order history dikhane ke liye — kai product IDs ek saath fetch karta hai
// (naam + image), taake order items ke saath dikhaya ja sake
export async function getProductsByIds(legacyIds: string[]) {
  if (legacyIds.length === 0) return {}

  const gids = Array.from(new Set(legacyIds)).map((id) => `gid://shopify/Product/${id}`)

  const data = await shopifyAdminFetch<any>(
    `
    query GetProductsByIds($ids: [ID!]!) {
      nodes(ids: $ids) {
        ... on Product {
          legacyResourceId
          title
          images(first: 1) {
            edges { node { url } }
          }
        }
      }
    }
  `,
    { ids: gids }
  )

  const map: Record<string, { name: string; image: string | null }> = {}
  for (const node of data.nodes || []) {
    if (!node) continue
    map[node.legacyResourceId] = {
      name: node.title,
      image: node.images?.edges?.[0]?.node?.url || null,
    }
  }
  return map
}