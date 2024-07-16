const mongoose=require('mongoose');


const incomeSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    description:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default: Date.now,
        required:true
    }
});

const Income=mongoose.model('Income',incomeSchema);


module.exports=Income;

