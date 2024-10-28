require('dotenv').config();

const bcrypt = require('bcrypt');
const express = require('express');
const https = require('https');
const app = express();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const session = require('express-session');

const sendWelcomeEmail = require('./public/src/emailSend.js');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");
app.use(session({
    secret: process.env.DB_PASS, // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const db = process.env.DB;
const slt = parseInt(process.env.SALT, 10);
if (isNaN(slt)) {
    console.error("SALT must be a number in the .env file");
    process.exit(1);
}

const uri = `mongodb+srv://${user}:${pass}@cluster0.m6rt5.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    username: String,
    password: String
});


var dopple = false;
var right_pass = true;
var right_log = true;

var email = null;
var name = null;
var username = null;
var password = null;
var conf_password = null;

const EMAIL = process.env.EMAIL;
const CLIENT_ID = process.env.CLIENT_ID; // Your Google Client ID
const CLIENT_SECRET = process.env.CLIENT_SECRET; // Your Google Client Secret
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'; // Default redirect URI for testing
const REFRESH_TOKEN = process.env.REFRESH_TOKEN; // Get this from OAuth2 Playground
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});


//START OF EMAILING FUNCTIONS
async function sendMail(sendEmail){
    try{
        const accesToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: EMAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accesToken,
            },
            tls: {
                rejectUnauthorized: false // Allow self-signed certificates
            }
        });

        const mailOptions = {
            from: `Berkeley's Dilemma <${EMAIL}>`,
            to: sendEmail,
            subject: 'Welcome to Berkeleys Dilemma!',
            text: 'Thank you for signing up!',
            html: '<h1>Keep on Killing!</h1><h3>Your hypocresy is burning the planet down, causing <strong>hurricanes</strong> and <strong>death</strong></h3><p>We hope you are enjoying watching how the planet f&#64;&#37;!ing dies!!!!! Have a look to some of the animals you are killing!</p><img src="https://i.pinimg.com/originals/e0/ca/a4/e0caa4176077632b0c048b06d4ef163c.gif"><img src="https://i.pinimg.com/originals/7d/2f/ae/7d2faebec61ec4d14f7cd623833f35cc.gif"><img src="https://64.media.tumblr.com/70cb4804b35cca0d4892c87a5165a607/tumblr_no73imiY6S1qgwf6po4_400.gif"><img src="https://media1.giphy.com/media/lnbKvnDO4yYwYzOmru/200w.gif?cid=82a1493b0i4e652llmr3blaqc7p44uf5l3nizroem1n0lr87&ep=v1_gifs_related&rid=200w.gif&ct=g"><p>Happy hunting!!!</p>',
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    }catch(error){
        return error;
    }
};

//END OF EMAILING FUNCTIONS


userSchema.pre('save', async function (next) {
    console.log("Inside pre-save hook"); // Debugging
    console.log("Is password modified? ", this.isModified('password')); // Debugging

    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(slt); // Ensure slt is a valid number
            this.password = await bcrypt.hash(this.password, salt);
            console.log("Password hashed:", this.password);
        } catch (err) {
            console.error("Error in password hashing", err);
            return next(err);
        }
    }
    next();
});

const appUser = mongoose.model('appUser', userSchema);

async function createUser(email, name, username, password) {
    try {
        // Reset dopple flag before checking
        dopple = false;

        // Check for an existing user with the same email or username
        const usr = await appUser.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });
        
        // If no user found, create a new one
        if (!usr) {
            const user = new appUser({ email, name, username, password });
            await user.save();
            console.log(password);
            console.log('User created successfully!');
        } else {
            // Set dopple flag to indicate a duplicate user
            dopple = true;
            console.log("Doppleganger found, no user created");
        }

    } catch (error) {
        console.error("Error creating user:", error);
    }
};


app.route('/')
    .get((req, res)=>{
        req.session.sessUser = null;

        right_pass = true
        right_log = true;

        var params = {
            apiKey: process.env.MAP_PASS ,
            dopple,
            right_log,
        };

        console.log("*$*$*$*$*$ " + dopple);
        res.render('account', params);
    })
    .post(async (req, res)=>{
        const username = req.body.username;
        const password = req.body.password;
        try {
            const user = await appUser.findOne({ username });
            
            if (!user) {
                console.log(username);
                right_log = false;
                var params = {
                    apiKey: process.env.MAP_PASS,
                    dopple,
                    right_log,
                };
                return res.render('account', params);
            }
    
            console.log("Comparing passwords:");
            console.log("Plain Password: ", password); // The password entered by the user
            console.log("Hashed Password: ", user.password); // The hashed password from the database
    
            const isMatch = await bcrypt.compare(password.trim(), user.password);
            console.log("Passwords match: ", isMatch); // Log the result of the comparison
    
            if (isMatch) {
                req.session.sessUser = user;
                return res.redirect('/index');
            } else {
                right_log = false;
                var params = {
                    apiKey: process.env.MAP_PASS,
                    dopple,
                    right_log,
                };
                console.log("Incorrect password for user:", username); // Log for debugging
                return res.render('account', params);
            }
            
        } catch (error) {
            console.error("Error during login:", error);
            return res.status(500).send('Internal Server Error');
        }
    });


app.route('/signin')
    .get((req, res)=>{
        dopple = false;
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
    .post(async (req, res)=>{
        email = req.body.email;
        name = req.body.name;
        username = req.body.username;
        password = req.body.password;
        conf_password = req.body.conf_password;

        if(password === conf_password){
            right_pass = true;
            dopple = false;
            await createUser(email, name, username, password);

            sendMail(email).then(result=>console.log("Email sent", result)).catch(error=>console.error(error.message));

            res.redirect('/');
            
        }else{
            right_pass = false;
            res.redirect('/signin');
        };
    });
    

app.route('/index')
    .get((req, res)=>{
        const sessUser = req.session.sessUser || null;
       
        var params = {
            sessUser,
        };

        console.log(sessUser);
        res.render('index', params);
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
        
        const sessUser = req.session.sessUser || null;
        const params = {
            carrousel,
            sessUser,
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
  