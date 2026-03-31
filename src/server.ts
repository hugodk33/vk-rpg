import express from 'express'
import userRoutes from './api/routes/userRoutes'
import './infra/database/migrate'

const app = express()

app.use(express.json())
app.use(userRoutes)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})