const sequelize=require('sequelize')
const createuser=require('./user')
const createpost=require('./post')
const sequelizeInstance = new sequelize('chathub', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  
  });

sequelizeInstance.authenticate().then(()=>console.log('---------Connection Established successfully--------')).catch(err => {
    console.error('--------Unable to connect to the database:---------\n', err);
});

const usertable=createuser(sequelizeInstance)
const posttable=createpost(sequelizeInstance)

function connectDB(){

sequelizeInstance.sync().then(()=>console.log("---------User Table Created Successfully------------")).catch(err=>console.log(err))
}
module.exports={sequelizeInstance,usertable,connectDB,posttable}