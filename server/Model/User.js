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
    Mobile:{
        type:String,
        match:/^[6-9]\d{9}$/,
        required:true
    },
    expenses:[{ 
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Expense' 
    }],
    incomes: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Income'
    }]
});

const User=mongoose.model('User',userSchema);

module.exports=User;