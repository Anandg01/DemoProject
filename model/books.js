const Sequlize=require("sequelize");
const sequelize=require('../util/database');
const { setuid } = require("process");

const books=sequelize.define("books",{
    id:{
        type:Sequlize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:Sequlize.STRING,
        allowNull:true
    },
    author:{
      type:Sequlize.STRING
    },
    soldOutUserId:{
        type:Sequlize.INTEGER
    },
    borrowedUserId:{
        type:Sequlize.INTEGER
    }
})

module.exports=books