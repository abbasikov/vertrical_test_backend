const express = require('express')
const data = require('./data.json')
const compression = require('compression')
require('dotenv').config()
var cors = require('cors')
const app = express()

app.use(compression())
app.use(cors({
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200
}))
const port = process.env.PORT || 9000

app.get('/', (req, res) => {
  const searchTerm = req.query.title.toLowerCase()
  const result = data.filter(item => item.title.includes(searchTerm))
  if (!result.length)
    res.status(404).send("Title not found!!!")
  else res.json(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})