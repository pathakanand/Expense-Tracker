const mongoose=require('mongoose');
const Expense = require('./Expense');

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    ConfirmPassword:{
        type:String,
        required:true
    },
    Mobile:{
        type:String,
        match:/^[6-9]\d{9}$/,
        required:true
    },
    expenses:[{ 
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Expense' 
    }]
})

const User=mongoose.model('User',userSchema);

module.exports=User;