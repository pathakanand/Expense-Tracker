const express=require('express');
const app=express();
const mongoose=require('mongoose');
const Expense=require('./Model/Expense');
const expenseRoutes=require('./routes/expenseRoutes');
const authRoutes=require('./routes/authRoutes');
const cors=require('cors');
const User=require('./Model/User');


mongoose.connect('mongodb://127.0.0.1:27017/expense-tracker').then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});


app.use(express.json());
app.use(cors({
    credentials:true,
    origin:"http://localhost:3000"
}));
app.use(expenseRoutes);
app.use('/api',authRoutes);
app.listen(8080,()=>{
    console.log("server connected at port 8080");
})