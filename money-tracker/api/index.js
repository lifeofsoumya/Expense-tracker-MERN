const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Transaction = require('./models/Transaction')
require('dotenv').config()
mongoose.set('strictQuery', false);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res)=>{
    res.json('ok');
})

app.post('/api/transaction', async (req, res)=>{
    await mongoose.connect(process.env.MONGO_URI);
    const { name, description, datetime, price} = await req.body;
    const transaction = await Transaction.create({name, price, description, datetime})
    // console.log(req.body);
    
    res.json(transaction);
})

app.get('/api/transactions', async (req, res)=>{
    await mongoose.connect(process.env.MONGO_URI);
    const transactions = await Transaction.find({});
    res.json(transactions);
})


const port = process.env.PORT || 5000;
app.listen(port, ()=>{console.log(`backend running at port localhost:${port}`)})