const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({
    extended: true
  }));
 app.use(bodyParser.json());
  


app.get("/", (req, res) => {
    
    MongoClient.connect("mongodb://admin:password@localhost:27017", {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) =>{
        if(error){
            return console.log("Unable to connect to database")
        }
        console.log("Connected to database")
        const db = client.db("user-account")
        db.collection('users').findOne({name : "Katherine Escano"}, (err, result) => {
            if(err){
                client.close()
                return res.send("Something went wrong")
            }
            client.close()
            res.send(result)
        })
    }) 
});
app.get("/users", (req, res) => {
    
    MongoClient.connect("mongodb://admin:password@localhost:27017", {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) =>{
        if(error){
            return console.log("Unable to connect to database")
        }
        console.log("Connected to database")
        const db = client.db("user-account")
        db.collection('users').find({}).limit(10).toArray((err, result) => {
            if(err){
                client.close()
                return res.send("Something went wrong")
            }
            
            client.close()
            res.send(result)
        })
    }) 
});

app.post('/users', (req, res)=> {
    const doc = {
        name: req.body.name
    }
    MongoClient.connect("mongodb://admin:password@localhost:27017", {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) =>{
        if(error){
            return console.log("Unable to connect to database")
        }
        console.log("Connected to database")
        const db = client.db("user-account")
        db.collection('users').insertOne(doc, (err, result) => {
            if(err){
                client.close()
                return res.send("Something went wrong")
            }
            client.close()
            res.send(result.ops[0])
        })
    }) 
})

app.listen(port, ()=>{
    console.log("Server is up on port " + port)
});