const express = require('express');
const dotenv = require("dotenv");
const dbConnect = require('./config/db');
const userRoutes = require('./routes/userRoutes');
dotenv.config();
dbConnect();


const app = express()
app.use(express.json());

const port = process.env.PORT;
app.get('/', (req, res) => {
  res.send('Hello World')
  console.log("hellow World");
  
})

app.use('/api/auth', userRoutes);

app.listen((port),() => {
    console.log(`Server is running on port ${port}`);
    
})