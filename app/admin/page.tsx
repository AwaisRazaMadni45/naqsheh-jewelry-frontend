'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-context'
import { getAdminStats, getAllOrders, updateOrderStatus, getAllContactMessages,getAllSubscribers } from '@/lib/api'
import { Package, Users, ShoppingBag, DollarSign, Mail } from 'lucide-react'

export default function AdminPage() {
  const { user, token, isLoading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [subscribers, setSubscribers] = useState<any[]>([])
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      router.push('/')
    }
  }, [user, isLoading, router])

 useEffect(() => {
  if (user && user.isAdmin && token) {
    Promise.all([getAdminStats(token), getAllOrders(), getAllContactMessages(), getAllSubscribers()])
      .then(([statsData, ordersData, messagesData, subscribersData]) => {
        if (statsData.success) setStats(statsData.stats)
        setOrders(Array.isArray(ordersData) ? ordersData : [])
        setMessages(Array.isArray(messagesData) ? messagesData : [])
        setSubscribers(Array.isArray(subscribersData) ? subscribersData : [])
      })
      .finally(() => setLoadingData(false))
  }
}, [user, token])

  const formatPrice = (price: number) => `Rs ${price.toLocaleString('en-PK')}`

  const handleStatusChange = async (orderId: string, status: string) => {
    await updateOrderStatus(orderId, status)
    setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status } : o)))
  }

  if (isLoading || !user || !user.isAdmin) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <p className="text-muted-foreground">Checking access...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 lg:pt-28 max-w-6xl mx-auto px-4 pb-16">
      <h1 className="font-serif text-3xl mb-8">Admin Dashboard</h1>

      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="border border-border rounded-lg p-5">
            <ShoppingBag className="h-5 w-5 text-gold mb-2" />
            <p className="text-2xl font-semibold">{stats.totalOrders}</p>
            <p className="text-xs text-muted-foreground">Total Orders</p>
          </div>
          <div className="border border-border rounded-lg p-5">
            <Package className="h-5 w-5 text-gold mb-2" />
            <p className="text-2xl font-semibold">{stats.totalProducts}</p>
            <p className="text-xs text-muted-foreground">Total Products</p>
          </div>
          <div className="border border-border rounded-lg p-5">
            <Users className="h-5 w-5 text-gold mb-2" />
            <p className="text-2xl font-semibold">{stats.totalUsers}</p>
            <p className="text-xs text-muted-foreground">Total Users</p>
          </div>
          <div className="border border-border rounded-lg p-5">
            <DollarSign className="h-5 w-5 text-gold mb-2" />
            <p className="text-2xl font-semibold">{formatPrice(stats.totalRevenue)}</p>
            <p className="text-xs text-muted-foreground">Total Revenue</p>
          </div>
        </div>
      )}

      <h2 className="font-serif text-2xl mb-4">All Orders</h2>

      {loadingData ? (
        <p className="text-muted-foreground">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-muted-foreground">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto border border-border rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left py-3 px-4 font-medium">Order ID</th>
                <th className="text-left py-3 px-4 font-medium">Customer</th>
                <th className="text-left py-3 px-4 font-medium">Items</th>
                <th className="text-left py-3 px-4 font-medium">Total</th>
                <th className="text-left py-3 px-4 font-medium">Date</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t border-border">
                  <td className="py-3 px-4 font-mono text-xs">{order._id.slice(-8)}</td>
                  <td className="py-3 px-4">
  <p className="font-medium">{order.user?.name || 'N/A'}</p>
  <p className="text-xs text-muted-foreground">{order.user?.email}</p>
  <p className="text-xs text-muted-foreground mt-1">
    {order.shippingAddress?.address}, {order.shippingAddress?.city}
  </p>
</td>
                  <td className="py-3 px-4">{order.orderItems?.length || 0} item(s)</td>
                  <td className="py-3 px-4">{formatPrice(order.totalPrice)}</td>
                  <td className="py-3 px-4 text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={order.status || 'Pending'}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="border border-border rounded-md px-2 py-1 text-xs focus:outline-none focus:border-gold"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="font-serif text-2xl mb-4 mt-12">Contact Messages</h2>

      {messages.length === 0 ? (
        <p className="text-muted-foreground">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg._id} className="border border-border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm font-medium">{msg.name}</p>
                  <p className="text-xs text-muted-foreground">{msg.email}</p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm font-medium mb-1">{msg.subject}</p>
              <p className="text-sm text-muted-foreground">{msg.message}</p>
            </div>
          ))}
        </div>
      )}

      <h2 className="font-serif text-2xl mb-4 mt-12">
        Newsletter Subscribers ({subscribers.length})
      </h2>

      {subscribers.length === 0 ? (
        <p className="text-muted-foreground">No subscribers yet.</p>
      ) : (
        <div className="overflow-x-auto border border-border rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left py-3 px-4 font-medium">Email</th>
                <th className="text-left py-3 px-4 font-medium">Subscribed On</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub) => (
                <tr key={sub._id} className="border-t border-border">
                  <td className="py-3 px-4">{sub.email}</td>
                  <td className="py-3 px-4 text-xs text-muted-foreground">
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}