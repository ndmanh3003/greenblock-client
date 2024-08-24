import express from 'express'
import morgan from 'morgan'
import path from 'path'

const app = express()
app.use(morgan('dev'))
app.use(express.static('../dist'))

app.all('*', (_req, res) => {
  res.sendFile(path.resolve('../dist/index.html'))
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
