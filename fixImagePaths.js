import xlsx from 'xlsx'
import fs from 'fs'
import path from 'path'

const EXCEL_PATH = '../../backend/backend/products.xlsx'
const workbook = xlsx.readFile(EXCEL_PATH)
const sheet = workbook.Sheets['Products']
const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 })

const imagesRoot = './public/images'
const folderMap = {}
for (const folder of fs.readdirSync(imagesRoot)) {
  const folderPath = path.join(imagesRoot, folder)
  if (fs.statSync(folderPath).isDirectory()) {
    const files = fs.readdirSync(folderPath)
    const map = {}
    files.forEach((f) => {
      map[f.toLowerCase()] = f
    })
    folderMap[folder.toLowerCase()] = map
  }
}

let fixedCount = 0
let missingCount = 0

for (let i = 1; i < rows.length; i++) {
  const row = rows[i]
  const imagePath = row[4]
  if (!imagePath) continue

  const parts = String(imagePath).replace(/^\//, '').split('/')
  const folder = parts[1]
  const filename = parts.slice(2).join('/')
  const folderFiles = folderMap[folder?.toLowerCase()]

  if (!folderFiles) {
    console.log(`Row ${i + 1}: FOLDER NOT FOUND -> ${imagePath}`)
    missingCount++
    continue
  }

  const actualFile = folderFiles[filename.toLowerCase()]
  if (!actualFile) {
    console.log(`Row ${i + 1}: FILE NOT FOUND -> ${imagePath}`)
    missingCount++
    continue
  }

  const correctPath = `/images/${folder}/${actualFile}`
  if (correctPath !== imagePath) {
    console.log(`Row ${i + 1}: FIXED  ${imagePath}  ->  ${correctPath}`)
    row[4] = correctPath
    fixedCount++
  }
}

const newSheet = xlsx.utils.aoa_to_sheet(rows)
workbook.Sheets['Products'] = newSheet
xlsx.writeFile(workbook, '../../backend/backend/products_fixed.xlsx')

console.log(`\nDone! Fixed: ${fixedCount}, Still Missing: ${missingCount}`)