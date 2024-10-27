require('dotenv').config();

const bcrypt = require('bcrypt');
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
const slt = process.env.SALT;


const uri = `mongodb+srv://${user}:${pass}@cluster0.m6rt5.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    username: String,
    password: String
});

const appUser = mongoose.model('appUser', userSchema);


var dopple = false;
var right_pass = true;

var email = null;
var name = null;
var username = null;
var password = null;
var conf_password = null;

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(slt); // You can adjust the salt rounds
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

async function createUser(email, name, username, password) {
    try {
        const usr = await appUser.findOne({email: email});
        
        if(!usr){
            const user = new User({email, name, username, password});
            await user.save();
            console.log('User created successfully!');
        }
        else{
            dopple = true;
        }

    } catch (error) {
        console.log(error);
    };

    
};


app.route('/')
    .get((req, res)=>{
        right_pass = true
        var params = {
            apiKey: process.env.MAP_PASS ,
        };

        res.render('account', params);
    });


app.route('/signin')
    .get((req, res)=>{
        if(right_pass){
            email = null;
            name = null;
            username = null;
            password = null;
            conf_password = null;
        }

        var params = {
            right_pass,
            email,
            name,
            username,
            password,
            conf_password,
        };

        res.render('signin', params);
    })
    .post((req, res)=>{
        email = req.body.email;
        name = req.body.name;
        username = req.body.username;
        password = req.body.password;
        conf_password = req.body.conf_password;

        if(password === conf_password){
            right_pass = true;

        }else{
            right_pass = false;
            res.redirect('/signin');
        };
    });
    

app.route('/index')
    .get((req, res)=>{
        res.render('index');
    });

app.route('/environment')
    .get((req, res)=>{
        var carrousel = [
            {
                src: 'https://via.placeholder.com/400x300?text=Foto+1',
                alt: 'Thumbnail 1',
                overlay: 'My name is Yoshikage Kira. I\'m 33 years old. My house is in the northeast section of Morioh, where all the villas are, and I am not married. I work as an employee for the Kame Yu department stores, and I get home every day by 8 PM at the latest.'
            },
            {
                src: 'https://via.placeholder.com/400x300?text=Foto+2',
                alt: 'Thumbnail 2',
                overlay: 'My name is Yoshikage Kira. I\'m 33 years old. My house is in the northeast section of Morioh, where all the villas are, and I am not married. I work as an employee for the Kame Yu department stores, and I get home every day by 8 PM at the latest.'
            },
            {
                src: 'https://via.placeholder.com/400x300?text=Foto+3',
                alt: 'Thumbnail 3',
                overlay: 'My name is Yoshikage Kira. I\'m 33 years old. My house is in the northeast section of Morioh, where all the villas are, and I am not married. I work as an employee for the Kame Yu department stores, and I get home every day by 8 PM at the latest.'
            },
            {
                src: 'https://via.placeholder.com/400x300?text=Foto+4',
                alt: 'Thumbnail 4',
                overlay: 'My name is Yoshikage Kira. I\'m 33 years old. My house is in the northeast section of Morioh, where all the villas are, and I am not married. I work as an employee for the Kame Yu department stores, and I get home every day by 8 PM at the latest.'
            },
            {
                src: 'https://via.placeholder.com/400x300?text=Foto+5',
                alt: 'Thumbnail 5',
                overlay: 'My name is Yoshikage Kira. I\'m 33 years old. My house is in the northeast section of Morioh, where all the villas are, and I am not married. I work as an employee for the Kame Yu department stores, and I get home every day by 8 PM at the latest.'
            },
            {
                src: 'https://via.placeholder.com/400x300?text=Foto+6',
                alt: 'Thumbnail 6',
                overlay: 'My name is Yoshikage Kira. I\'m 33 years old. My house is in the northeast section of Morioh, where all the villas are, and I am not married. I work as an employee for the Kame Yu department stores, and I get home every day by 8 PM at the latest.'
            },
            {
                src: 'https://via.placeholder.com/400x300?text=Foto+7',
                alt: 'Thumbnail 7',
                overlay: 'My name is Yoshikage Kira. I\'m 33 years old. My house is in the northeast section of Morioh, where all the villas are, and I am not married. I work as an employee for the Kame Yu department stores, and I get home every day by 8 PM at the latest.'
            },
            {
                src: 'https://via.placeholder.com/400x300?text=Foto+8',
                alt: 'Thumbnail 8',
                overlay: 'My name is Yoshikage Kira. I\'m 33 years old. My house is in the northeast section of Morioh, where all the villas are, and I am not married. I work as an employee for the Kame Yu department stores, and I get home every day by 8 PM at the latest.'
            },
            {
                src: 'https://via.placeholder.com/400x300?text=Foto+9',
                alt: 'Thumbnail 9',
                overlay: 'My name is Yoshikage Kira. I\'m 33 years old. My house is in the northeast section of Morioh, where all the villas are, and I am not married. I work as an employee for the Kame Yu department stores, and I get home every day by 8 PM at the latest.'
            },
            {
                src: 'https://via.placeholder.com/400x300?text=Foto+10',
                alt: 'Thumbnail 10',
                overlay: 'My name is Yoshikage Kira. I\'m 33 years old. My house is in the northeast section of Morioh, where all the villas are, and I am not married. I work as an employee for the Kame Yu department stores, and I get home every day by 8 PM at the latest.'
            }
        ];
        

        const params = {
            carrousel,
        }

        
        res.render('environment', params);
    });


app.route('/map')
.get((req, res)=>{
    res.render('map', { apiKey: process.env.MAP_PASS });
});


app.listen(3000, ()=>{
    console.log("Berkeley listening port 3000");
  });
  