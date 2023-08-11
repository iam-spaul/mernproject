const express = require("express");
const mongoose=require('mongoose')
const dotenv=require('dotenv')
require('./db/db')
require('./model/user')


const app = express();

dotenv.config({path:'./config.env'})
const port=process.env.PORT

app.use(require('./route/auth'))

// MIddleware
// const  middleware=(req,res,next)=>{
//   console.log("hey Middleware!");
//   next();

// }
// middleware()
// app.use(express.json())



app.listen(port, () => {
  console.log(`running on port ${port}`);
});
