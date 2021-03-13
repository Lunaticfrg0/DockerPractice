const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;


app.listen(port, ()=>{
    console.log("Server is up on port " + port)
});