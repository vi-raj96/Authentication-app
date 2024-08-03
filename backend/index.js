//Main and Entry file
//cors : CORS comes from "Cross-Origin resource sharing" and is, basically, a protocol that allows or not a server to acess your website resources (routes data, api requests etc).

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');
const AuthRouter = require('./Routes/AuthRouter');
const HomeRouter = require('./Routes/AuthHomeRouter');

require('dotenv').config();
const PORT = process.env.PORT || 9090;
const mongo_url = process.env.MONGO_CONN;

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})

mongoose.connect(mongo_url)
.then(()=>{
    console.log("Mongo Server is Connected....");
}).catch((err)=>{
    console.log("Mongo Server error ",err);
})


app.use('/auth', AuthRouter);
app.use('/home', HomeRouter);