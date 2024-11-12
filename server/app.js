const express = require('express')
const app = express()

const PORT = 3001

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, world!')
})

// sign in a user
app.post('/signin', (req, res) => {
  res.send('Sign in a user')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
