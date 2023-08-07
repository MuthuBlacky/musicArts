const bodyparser = require("body-parser");

const multer = require("./multer");

const CRUD = require("./CRUD");

const express = require("express");

const fs = require("fs");

const app = express();

const https = require("https");

const path = require("path");

const { MongoClient } = require("mongodb");

app.use(express.static(path.join(__dirname, "public")));

const uri =
  "mongodb+srv://kasinathansj:kasi%40home61@cluster0.gumlfqd.mongodb.net/?retryWrites=true&w=majority";

// const uri = "mongodb://localhost:27017/"

const client = new MongoClient(uri);

const port = 3000;

app.use(bodyparser.urlencoded({ extended: true }));

app.listen(port, async function (req) {
  console.log(`server is running on ${port}`);
  await client.connect();
});

app.get("/",(req,res)=>{
  res.sendFile(__dirname+"index.html");
})

app.post("/login",(req,res)=>{
  res.sendFile(__dirname+"/public/login.html");
})

app.post("/signup",(req,res)=>{
  res.sendFile(__dirname+"/public/signup.html");
})

app.post("/signup/submit",async (req,res)=>{
  try{
    await CRUD.insertOne(client,"USERS",{
      _id:req.body.email,
      email:req.body.email,
      password:req.body.password
    });
  }catch(e){
    res.send("already exist");
  }
  res.render("addUserDetails.ejs",req.body)
})