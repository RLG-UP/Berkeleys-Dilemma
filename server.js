require('dotenv').config();

const express = require('express');
const https = require('https');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const db = process.env.DB;


app.route('/')
    .get((req, res)=>{
        res.render("index");
    })


app.listen(3000, ()=>{
    console.log("Berkeley listening port 3000");
  });
  