const express=require('express')
const bodyparser=require('body-parser')
const session=require('express-session')
var cookieParser = require('cookie-parser') 
const mainController=require('./controllers/main')
const postController=require('./controllers/post')
const {connectDB}=require('./dbHandler/index')
const app=express();
const port=4000
async function main(){
    
    app.use(cookieParser())
    app.set('view engine','ejs')
    app.set('views','views')
    
    app.use(bodyparser.urlencoded({ extended: true }))
    
    
    
    app.use(session({
        secret: '5da89d8cf43d2d2c3d56ae0007d5750f',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
        
    })) 
    
    
    
    
    
    
    app.use(function(req, res, next) {
        
        if (req.session.CurrentUser===undefined)
        {
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate,max-stale=0,post-check=0,pre-check=0');
            
        }
        next();
    }); 
    app.get('/',(req,res)=>mainController.home(req,res))
    
    app.get('/user/logout',(req,res)=>mainController.logout(req,res))
    app.get('/user/profile',(req,res)=>mainController.profile(req,res))
    app.post('/user/register',(req,res)=>mainController.register(req,res))
    app.post('/user/login',(req,res)=>mainController.login(req,res))
    app.post('/user/post/new',(req,res)=>postController.newPost(req,res))
    app.listen(port,()=>console.log(`--------ChatHub Listening on port ${port}----------`))
    
    await connectDB()
}
main()