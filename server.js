require('dotenv').config(); // Load environment variables from .env file

const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const express = require('express'); // Import express to create server
const dev = process.env.NODE_ENV !== 'production';

const https = require('https'); // Import https for secure HTTP requests
const app = express(); // Initialize express application
const mongoose = require('mongoose'); // Import mongoose for MongoDB connection
const nodemailer = require('nodemailer'); // Import nodemailer for email handling
const { google } = require('googleapis'); // Import google APIs for OAuth2
const session = require('express-session'); // Import express-session for session management

// Middleware configurations
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static("public")); // Serve static files from "public" folder
app.use(session({ // Configure session settings
    secret: process.env.DB_PASS, // Use DB_PASS as session secret
    resave: false,
    saveUninitialized: true,
    cookie: {
    secure: false, 
  }
}));


const cors = require('cors');
app.use(cors());


// Server Environment variables
const PORT = 5000;

// MongoDB environment variables
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const db = process.env.DB;
const slt = parseInt(process.env.SALT, 10); // Convert SALT to number for bcrypt
if (isNaN(slt)) { // Exit if SALT is not a number
    console.error("SALT must be a number in the .env file");
    process.exit(1);
}

// MongoDB connection URI
const uri = `mongodb+srv://${user}:${pass}@cluster0.m6rt5.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }); // Connect to MongoDB

// Define user schema for MongoDB
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    username: String,
    password: String,
    bestScore: {
        type: Number,
        default: 0,  // Default score is 0
    },
});

// State variables
var dopple = false; // Track duplicate user flag
var right_pass = true; // Track password correctness flag
var right_log = true; // Track login correctness flag

// Variables for form inputs
var email = null;
var name = null;
var username = null;
var password = null;
var conf_password = null;

// Environment variables for email and OAuth2
const EMAIL = process.env.EMAIL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'; // OAuth2 Playground URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN; // OAuth2 refresh token
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Ignore TLS errors

// Google OAuth2 client setup
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN }); // Set refresh token

// Email sending function
async function sendMail(sendEmail) {
    try {
        console.log("/Attempting to obtain access token...");
        const accesToken = await oAuth2Client.getAccessToken(); // Obtain access token
        console.log("//Access token obtained.");

        const transport = nodemailer.createTransport({
            service: 'gmail', // Use Gmail service
            auth: {
                type: 'OAuth2',
                user: EMAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accesToken, // Use access token
            },
            tls: {
                rejectUnauthorized: false // Allow self-signed certificates
            }
        });

        console.log("///Transport created, preparing email options...");
        // Define email options
        const mailOptions = {
            from: `Berkeley's Dilemma <${EMAIL}>`,
            to: sendEmail,
            subject: 'Welcome to Berkeleys Dilemma!',
            text: 'Thank you for signing up!',
            html: '<div style="font-family: Arial, sans-serif; color: #E7E5DF; line-height: 1.6; background-color: #393e41; padding: 20px; text-align: right;"><h1 style="color: #FF7F11; font-size: 2.5em; margin: 0;">Keep on Killing!</h1><h3 style="color: #FF7F11;">Your hypocrisy is burning the planet down, causing <strong>hurricanes</strong>, <strong>death</strong>, and <strong>extinction</strong>.</h3><p style="font-size: 1.2em; margin: 20px 0;">Feel the satisfaction? Enjoy watching as the world suffocates under the weight of your decisions. Every luxury, every convenience, every act of apathy—is fuel to the fire that’s reducing our world to ash.</p><p style="font-size: 1.2em; margin: 20px 0;">Here are the innocent lives you’re wiping out without a second thought:</p><div><img src="https://i.pinimg.com/originals/e0/ca/a4/e0caa4176077632b0c048b06d4ef163c.gif" alt="Animal suffering" style="width: 180px; margin: 10px;"><img src="https://i.pinimg.com/originals/7d/2f/ae/7d2faebec61ec4d14f7cd623833f35cc.gif" alt="Animal suffering" style="width: 180px; margin: 10px;"><img src="https://64.media.tumblr.com/70cb4804b35cca0d4892c87a5165a607/tumblr_no73imiY6S1qgwf6po4_400.gif" alt="Animal suffering" style="width: 180px; margin: 10px;"><img src="https://media1.giphy.com/media/lnbKvnDO4yYwYzOmru/200w.gif?cid=82a1493b0i4e652llmr3blaqc7p44uf5l3nizroem1n0lr87&ep=v1_gifs_related&rid=200w.gif&ct=g" alt="Animal suffering" style="width: 180px; margin: 10px;"></div><div style="margin: 30px 0; padding: 20px; background-color: #2d3133; border-right: 5px solid #FF7F11;"><p style="font-style: italic; font-size: 1.3em; color: #E7E5DF;">“Many people would kill a man to take the fat from his corpse and use it to grease their boots.”</p><p style="text-align: right; color: #888; font-size: 0.9em; margin: 0;">— Arthur Schopenhauer</p></div><p style="font-size: 1.2em; color: #FF7F11; font-weight: bold;">Wake up before it’s too late.</p><p style="font-size: 0.9em; color: #888;">Your choices are written in blood. Make sure you can live with them.</p></div>',
        };

        console.log("////Sending email...");
        const result = await transport.sendMail(mailOptions); // Send email
        console.log("/////Email sent successfully!");
        return result;
    } catch (error) {
        console.error("!--Error sending email:", error);
        return error;
    }
};

// Function to send email for user data edits
async function sendEditsMail(sendEmail, user) {
    try {
        console.log("/Attempting to obtain access token...");

        const accesToken = await oAuth2Client.getAccessToken(); // Obtain access token
        console.log("//Access token obtained.");

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
                rejectUnauthorized: false
            }
        });

        console.log("///Transport created, preparing email options...");

        // Define email options for edited information
        const mailOptions = {
            from: `Berkeley's Dilemma <${EMAIL}>`,
            to: sendEmail,
            subject: 'Your Information Has Been Updated!',
            text: 'Your updated information has been saved successfully.',
            html: `<div style="font-family: Arial, sans-serif; color: #E7E5DF; line-height: 1.6; background-color: #393e41; padding: 20px; text-align: right;">
                        <h1 style="color: #FF7F11; font-size: 2.5em; margin: 0;">Changes Saved!</h1>
                        <h3 style="color: #FF7F11;">Your updated information is as follows:</h3>
                        <p style="font-size: 1.2em; margin: 20px 0;color: #E7E5DF">Thank you for keeping your details up to date. Here’s what you’ve changed:</p>
                        <ul style="font-size: 1.2em; margin: 20px 0; list-style-type: none; padding: 0;">
                            <li><strong>Name:</strong> ${user.name}</li>
                            <li><strong>Email:</strong> ${user.email}</li>
                            <li><strong>Username:</strong> ${user.username}</li>
                        </ul>
                        <p style="font-size: 1.2em; margin: 20px 0;color: #E7E5DF">Feel free to reach out if you have any questions or need further assistance.</p>
                        <div style="margin: 30px 0; padding: 20px; background-color: #2d3133; border-right: 5px solid #FF7F11;">
                            <p style="font-style: italic; font-size: 1.3em; color: #E7E5DF;">“The best way to predict the future is to create it.”</p>
                            <p style="text-align: right; color: #888; font-size: 0.9em; margin: 0;">— Peter Drucker</p>
                        </div>
                        <p style="font-size: 1.2em; color: #FF7F11; font-weight: bold;">Thank you for your commitment!</p>
                        <p style="font-size: 0.9em; color: #888;">We appreciate your proactive approach in making a difference.</p>
                    </div>`,
        };

        console.log("////Sending email...");
        const result = await transport.sendMail(mailOptions); // Send email
        console.log("/////Email sent successfully!");
        return result;
    } catch (error) {
        console.error("!--Error sending email:", error);
        return error;
    }
};

// Mongoose pre-save hook to hash passwords
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) { // Check if password is modified
        try {
            const salt = await bcrypt.genSalt(slt); // Generate salt with specified rounds
            this.password = await bcrypt.hash(this.password, salt); // Hash password
        } catch (err) {
            console.error("Error in password hashing", err);
            return next(err);
        }
    }
    next();
});

// Define Mongoose model for users
const appUser = mongoose.model('appUser', userSchema);

// Function to create a new user in the database
async function createUser(email, name, username, password) {
    try {
        dopple = false; // Reset dopple flag before checking

        // Check for an existing user with the same email or username
        const usr = await appUser.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });
        
        if (!usr) { // Create a new user if none found
            const user = new appUser({ email, name, username, password });
            await user.save();
        } else {
            dopple = true; // Set dopple flag if user exists
        }
    } catch (error) {
        console.error("Error creating user:", error);
    }
};


app.route('/')
    .get((req, res)=>{
        res.send("<h1>Berkeley's API Running</h1>");
    })
// Route for home page
app.route('/login')
    .get((req, res) => {
        req.session.sessUser = null;
        right_pass = true;
        right_log = true;

        // Parameters for rendering account page
        let params = {
            apiKey: process.env.MAP_PASS,
            dopple,
            right_log,
        };
        //res.render('account', params);
        res.json(params);
    })
    .post(async (req, res) => { // Handle login
        const username = req.body.username;
        const password = req.body.password;
        try {
            const user = await appUser.findOne({ username });
            
            if (!user) { // If user not found, set right_log to false
                right_log = false;
                //return res.render('account', params);

                return res.json({success: false});
            }
    
            // Compare input password with hashed password
            const isMatch = await bcrypt.compare(password.trim(), user.password);
            if (isMatch) { // If passwords match, set session and redirect
                req.session.sessUser = user;
                req.session.userId = user._id;
                
                console.log("Session data:", req.session);
                console.log("--###>>USER ID: ",req.session.userId);
                return res.json({ success: true, user: req.session.sessUser});
            } else { // If passwords don't match, set right_log to false
                right_log = false;
                return res.json({success: false})
            }
            
        } catch (error) {
            console.error("Error during login:", error);
            return res.status(500).send('Internal Server Error');
        }
    });

// Route for sign-in page
app.route('/signin')
    .get((req, res) => {
        dopple = false;
        if (right_pass) {
            email = null;
            name = null;
            username = null;
            password = null;
            conf_password = null;
        }

        // Parameters for rendering signin page
        let params = {
            right_pass,
            email,
            name,
            username,
            password,
            conf_password,
        };

        res.json(params);
    })
    .post(async (req, res) => { // Handle sign-up form submission
        const { email, name, username, password} = req.body;
        console.log("--->Trying to create User")

        right_pass = true;
        dopple = false;

        await createUser(email, name, username, password);

        const user = {email, name, username};

        if (dopple === false){
        sendMail(email).then(result => console.log("Email sent", result)).catch(error => console.error(error.message));
        sendEditsMail(email, user);
        }
        
        return res.json({ success: true, message: 'User created successfully' });
            
    });
    

// Route to render the index page
app.route('/index')
    .get((req, res) => {
        // Retrieve session user information, or set to null if not found
        const sessUser = req.session.sessUser || null;

        // Parameters to pass to the EJS template
        var params = {
            sessUser, // session user data, if available
        };

        console.log("---->User: " + sessUser); // Log session user data for debugging
        res.json(params); // Render 'index' template with params
    });

//Update the score
app.post('/update-score', async (req, res) => {
    const { userId, score } = req.body;  // Expecting userId and score in the request body
    console.log("---->User ID: ", userId);
    if(userId === null){
        return;
    }

    try {
      const user = await appUser.findById(userId); // Find the user by ID
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the bestScore only if the new score is higher than the current one
      if (score > user.bestScore) {
        user.bestScore = score;
        await user.save();
        res.json({bestScore: user.bestScore});
      }
      else{
        res.json({bestScore: score});
      }
  
    } catch (error) {
      res.status(500).json({ message: 'Error updating score', error });
    }
  });

// Route to log the user out and destroy the session
app.route('/log-out')
    .get((req, res) => {
        // Destroy the current session
        req.session.destroy((err) => {
            if (err) {
                console.log("!--Impossible to log out: " + err); // Log any errors encountered during logout
            }
            res.redirect('/'); // Redirect to the homepage after logging out
        });
    });

// Route to render the user profile page
app.route('/user')
    .get((req, res) => {
        // Retrieve session user information, or set to null if not found
        const sessUser = req.session.sessUser || null;

        // Parameters to pass to the EJS template, including session user data
        var params = {
            sessUser,
        };

        res.json(params); // Render 'user' template with session user data
    });

// Route to render the edit profile page
app.route('/edit-profile')
    .get((req, res) => {
        // Retrieve session user information, or set to null if not found
        const sessUser = req.session.sessUser || null;

        // Parameters to pass to the EJS template, including session user data
        var params = {
            sessUser,
        };

        res.render("editUser", params); // Render 'editUser' template with session user data
    });

// Route to save edited profile data
app.route("/save-profile")
    .post(async (req, res) => {
        // Extract name, username, and email from the request body
        const userId = req.body.userId;
        const name = req.body.name;
        const username = req.body.username;
        const email = req.body.email;
        // Get user ID from session

        try {
            // Update user details in the database with the new values
            const searchUser = await appUser.findById(userId);
            const user = await appUser.findByIdAndUpdate(userId, {name, username, email}); // Find the user by ID
            //console.log("-))>>** UserId: ", user);

            // Update session data with the latest user info
            req.session.sessUser = user;
            req.session.userId = user._id;


            
            // Send a confirmation email of profile updates
            await sendEditsMail(req.body.email, {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
            });

            console.log(userId);
            console.log("-User profile updated"); // Confirmation log of profile update
            
            res.json({success: true, user}); // Redirect to the profile page after saving changes
        } catch (error) {
            console.error("!--Error updating user profile:", error); // Log any errors encountered during update
            res.json({success: false}); 
        }
    });

    app.route('/Top')
        .post(async (req, res)=>{
            try {
                const topUsers = await appUser.find()
                  .sort({ bestScore: -1 }) // Sort by bestScore in descending order
                
                console.log("--========> TOP USERS:",topUsers);
                res.json({status: true, topUsers});

              } catch (error) {
                console.error("Error retrieving top users:", error);
                res.json({status: false});
                throw error;
              }

        });

// Start the server and listen on port
app.listen(PORT, () => {
    console.log(`<|Berkeley listening port ${PORT}|>`); // Log server start and port information
});
