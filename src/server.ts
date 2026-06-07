import express from 'express'
import path from 'path'
import fs from 'fs'
import userRoutes from './api/routes/userRoutes'
import viewRoutes from './api/routes/view/main'
//import './infra/database/migrate'

const app = express()

app.use(express.json())
app.use(userRoutes)
app.use(viewRoutes)

const viewDistPath = path.join(__dirname, '..', '..', 'dist-view')
if (fs.existsSync(viewDistPath)) {
  app.use(express.static(viewDistPath))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(viewDistPath, 'index.html'))
  })
}

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})