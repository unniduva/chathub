const express=require('express')
const bodyparser=require('body-parser')
const mainController=require('./controllers/main')
const {connectDB}=require('./dbHandler/index')
const app=express();
const port=3000

app.set('view engine','ejs')
app.set('views','views')
app.get('/',(req,res)=>mainController.home(req,res))

app.listen(port,()=>console.log(`Facebbok Listening on port ${port}`))

connectDB()