const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');
//const sqlite3 = require('sqlite3').verbose();
const productRoutes = require('./Routes/productRoutes');
const authRoutes = require('./Routes/authRoutes');


app.listen(3000, () => {
    console.log("server running at port 3000")
})

app.use(express.json());


app.use('/api/products', productRoutes);
app.use('/api/users', authRoutes);
/*
let db = new sqlite3.Database('./mydb.db', (err) => {
    if(err) {
        console.error(err.message);
    }
    console.log('Connected to database.')
})*/

//const str = "mongodb+srv://philipjames9945:James99%40%2F%2F@node-api.wj49k.mongodb.net/Node-API?retryWrites=true&w=majority";
const str = process.env.MONGO_URI;
mongoose.connect(str)
.then(()=> {
    console.log("Connected Successfully");  
})
.catch((error)=> {
    console.log("Connection failed",error.message);
});

