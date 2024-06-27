const express=require('express');
const mongoose=require('mongoose');

const expressSchema=mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
})

const Expense=mongoose.model('Expense',expressSchema);

module.exports=Expense;