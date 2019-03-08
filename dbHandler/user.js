const sequelize=require('sequelize')

module.exports=function (sequelizeInstance){
  const UserTable =  sequelizeInstance.define('user', 
    {name:sequelize.STRING,password:sequelize.STRING,email:sequelize.STRING,dob:sequelize.DATE}
  );
  
  return UserTable
}



