const mongoose = require('mongoose');
const userRoutes= require('./routes/auth');
const env = require('dotenv');
const express = require('express');
const result = env.config();
const app = express();
const bodyParser =require('body-parser');
const cors = require('cors');

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.4untj.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log("database connected");
    });

    app.use(cors());
app.use(bodyParser());
app.use('/action',userRoutes);

app.get('/',(req,res,nest)=>{
    res.status(200).json({
        message: 'hello from server'
    });
});
 
app.listen(process.env.PORT,()=>{
    if (result.error) {
        throw result.error
      }
    console.log(result.parsed);
    console.log(`server is running on port ${process.env.PORT}`);
});
