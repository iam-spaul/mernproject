const mongoose=require('mongoose')
const dotenv=require('dotenv').config({path:'./config.env'})
const db=process.env.DB

mongoose.connect(db).then(()=>{
  console.log("connection sucesss");
}).catch((err)=>{
  console.log(err);
})
