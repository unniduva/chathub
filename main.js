const {usertable}=require('../dbHandler/')
class MainController{
    home(req,res){
        
        if (req.session.SuccMsg!==undefined){
            const {message,color}=req.session.SuccMsg
            req.session.SuccMsg={message:'',color:''}
            res.render('home',{RegSuccess:{message:message,color:color}})
        }else {
            res.render('home',{RegSuccess:{message:'',color:''}})
        }
    }
    logout(req,res){
         
        req.session.destroy(function(err) {
            res.redirect('/')
        })
        console.log("Sesssion after logout",req.session)
        
    }
    async profile(req,res){
        if (req.session.CurrentUser===undefined){
            res.send("PAge not found..")
        }else{
            res.render('profile',{currentUser:req.session.CurrentUser})
        }
    }
    async login(req,res){
        const {MoborEmail,password}=req.body
      
        const LoggedUser=await usertable.findOne({where:{email:MoborEmail}})
        
        if (password===LoggedUser.password){
            req.session.CurrentUser=LoggedUser;
            res.render('profile',{currentUser:req.session.CurrentUser})
        } else {
            res.redirect('/');
        }
        
    }
    async register(req,res){
        var Success={message:'',color:''}
        const {firstName,surName,MoborEmail,bday,password}=req.body
        if(!firstName || !MoborEmail || !password){
            res.send("Please add valid details")
            return
        }
        try {
            await usertable.create(
                {
                    name:firstName+""+surName,
                    password,
                    email:MoborEmail,
                    dob:bday
                }
                ).then(()=>{
                    console.log('---------Inserted Successfully-----------')
                    Success.message="Successfull Registration.. Now You Can Login !!!"
                    Success.color='Green' 
                    
                    
                }).catch(err=>{
                    console.log(err)
                    Success.message=" Registration Failed.. Please Try Again !!!"
                    Success.color='Red'
                })
                
            } catch (error) {
                console.log(error)
            }
            req.session.SuccMsg=Success
            
            req.session.save(()=>{
                
                res.redirect('/')})
                
                
            }
            
            
            
            
        }
        
        module.exports=new MainController();
        
        