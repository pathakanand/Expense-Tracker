const express=require('express');
const mongoose=require('mongoose');
const User=require('./User');
const expressSchema=mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    user: {
       type: mongoose.Schema.Types.ObjectId, 
       ref: 'User', 
       required: true 
    }
})

const Expense=mongoose.model('Expense',expressSchema);

module.exports=Expense;