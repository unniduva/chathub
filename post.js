const sequelize=require('sequelize')

module.exports=async function (sequelizeInstance){
  const PostTable =  await sequelizeInstance.define('post', 
  {user_id:sequelize.STRING,
    post:sequelize.TEXT,
    },

    );
    
    return PostTable
  }
  
  