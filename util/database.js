const Sequlize=require('sequelize');

const sequelize=new Sequlize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
    host:process.env.DB_HOST,
    dialect:'mysql'
})

module.exports=sequelize;