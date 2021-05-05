import express from 'express'
import { router as healthcheckRouter } from './routes/healthcheckRoutes'

const app = express()

app.use(express.json())

app.use(healthcheckRouter)

const PORT = 5000
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
