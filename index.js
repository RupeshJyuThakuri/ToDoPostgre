import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();

import userRoute from "./routes/users.js"
import todoRoute from "./routes/todos.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use('/users', userRoute)
app.use('/todos', todoRoute)

const port = process.env.PORT || 5000;

import pool from "./config/db.js";

async function testConnection() {
  try {
    const client = await pool.connect(); // acquire a client
    console.log("PostgreSQL connected successfully");
    client.release(); // release client back to pool
  } catch (error) {
    console.error("PostgreSQL connection failed:", error.message);
    process.exit(1); // exit app if db connection fails
  }
}

await testConnection();


app.listen(port, () => console.log(`app running at port ${port}`));

