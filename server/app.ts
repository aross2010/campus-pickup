import express, { Request, Response } from 'express'

const app = express()

const PORT = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hellooo')
})

app.listen(PORT, () => {
  console.log('Server is running on port 3000')
})

// nodemon app.ts
