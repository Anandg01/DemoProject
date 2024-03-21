const Sequlize=require('sequelize');
const sequelize=require('../util/database');


const users= sequelize.define('users',{
    id:{
        type:Sequlize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequlize.STRING,
        allowNull:false
    },
    email:{
        type:Sequlize.STRING,
        uniaue:true,
        allowNull:false
    },
    password:{
        type:Sequlize.STRING,
        allowNull:false
    },
    admin:{
        type:Sequlize.BOOLEAN
    }
})

module.exports=users;