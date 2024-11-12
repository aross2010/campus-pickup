# campus-pickup

CMPE 133 Project

## Project Description

**CampusPickup** is designed to help college students easily find and organize various pickup games on campus.
**CampusPickup** provides real-time updates, game scheduling tools, and user profiles to connect students with similiar sports interests.

Users are able to create an account and log into the account. From there, they can browse for events in their sports of interests, create new events and join other events.

## Technologies

1. MongoDB
2. ExpressJS
3. ReactJS + NextJS
4. NodeJS

## Languages

1. Javascript
2. HTML
3. CSS

## Setup

> Follow the instructions to set it up locally.

-

### Frontend

The frontend of this application is made with ReactJS and NextJS.

### Backend

MongoDB database with NodeJS framework using Express.

### Future Implementaion

---

### Contributors

- [Mohammed Rahman](https://github.com)
- [Noah Scheuerman](https://github.com)
- [Alex Ross](https://github.com)
- [Phuong Tong](https://github.com/YPhuong15)
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
