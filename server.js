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


const uri = `mongodb+srv://${user}:${pass}@cluster0.m6rt5.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.route('/')
    .get((req, res)=>{
        res.render('index');
    })

app.route('/environment')
    .get((req, res)=>{
        var carrousel = [
            `https://via.placeholder.com/1920x1080?text=Foto+1`,
            `https://via.placeholder.com/1920x1080?text=Foto+2`,
            `https://via.placeholder.com/1920x1080?text=Foto+3`,
            `https://via.placeholder.com/1920x1080?text=Foto+4`,
            `https://via.placeholder.com/1920x1080?text=Foto+5`,
            `https://via.placeholder.com/1920x1080?text=Foto+6`,
            `https://via.placeholder.com/1920x1080?text=Foto+7`,
            `https://via.placeholder.com/1920x1080?text=Foto+8`,
            `https://via.placeholder.com/1920x1080?text=Foto+9`,
            `https://via.placeholder.com/1920x1080?text=Foto+10`
        ];

        const params = {
            carrousel,
        }

        
        res.render('environment', params);
    })


app.listen(3000, ()=>{
    console.log("Berkeley listening port 3000");
  });
  