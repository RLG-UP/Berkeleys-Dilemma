require('dotenv').config(); // Load environment variables from .env file

const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const express = require('express'); // Import express to create server
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
app.engine("ejs", require("ejs").renderFile); // Set EJS as templating engine
app.set("view engine", "ejs"); // Define view engine
app.use(session({ // Configure session settings
    secret: process.env.DB_PASS, // Use DB_PASS as session secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure cookies if using HTTPS
}));

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
    password: String
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
                        <p style="font-size: 1.2em; margin: 20px 0;">Thank you for keeping your details up to date. Here’s what you’ve changed:</p>
                        <ul style="font-size: 1.2em; margin: 20px 0; list-style-type: none; padding: 0;">
                            <li><strong>Name:</strong> ${user.name}</li>
                            <li><strong>Email:</strong> ${user.email}</li>
                            <li><strong>Username:</strong> ${user.username}</li>
                        </ul>
                        <p style="font-size: 1.2em; margin: 20px 0;">Feel free to reach out if you have any questions or need further assistance.</p>
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

// Route for home page
app.route('/')
    .get((req, res) => {
        req.session.sessUser = null;
        right_pass = true;
        right_log = true;

        // Parameters for rendering account page
        var params = {
            apiKey: process.env.MAP_PASS,
            dopple,
            right_log,
        };
        res.render('account', params);
    })
    .post(async (req, res) => { // Handle login
        const username = req.body.username;
        const password = req.body.password;
        try {
            const user = await appUser.findOne({ username });
            
            if (!user) { // If user not found, set right_log to false
                right_log = false;
                var params = {
                    apiKey: process.env.MAP_PASS,
                    dopple,
                    right_log,
                };
                return res.render('account', params);
            }
    
            // Compare input password with hashed password
            const isMatch = await bcrypt.compare(password.trim(), user.password);
            if (isMatch) { // If passwords match, set session and redirect
                req.session.sessUser = user;
                req.session.userId = user._id;
                return res.redirect('/index');
            } else { // If passwords don't match, set right_log to false
                right_log = false;
                var params = {
                    apiKey: process.env.MAP_PASS,
                    dopple,
                    right_log,
                };
                return res.render('account', params);
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
    .post(async (req, res) => { // Handle sign-up form submission
        email = req.body.email;
        name = req.body.name;
        username = req.body.username;
        password = req.body.password;
        conf_password = req.body.conf_password;

        if (password === conf_password) { // If passwords match, create user
            right_pass = true;
            dopple = false;
            await createUser(email, name, username, password);

            sendMail(email).then(result => console.log("Email sent", result)).catch(error => console.error(error.message));
            res.redirect('/');
            
        } else { // If passwords don't match, set right_pass to false
            right_pass = false;
            res.redirect('/signin');
        };
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
        res.render('index', params); // Render 'index' template with params
    });

// Route to render the Amazon environment page
app.route('/environment')
    .get((req, res) => {
        // Define carousel data array, each object represents an image and description
        var carrousel = [
            {
                src: 'https://hips.hearstapps.com/hmg-prod/images/mata-atlantica-atlantic-forest-in-brazil-royalty-free-image-1668724621.jpg',
                alt: 'Healthy Amazon',
                overlay: 'Diverse and balanced ecosystems with rich biodiversity. Sustainable support for indigenous communities and wildlife.'
            },
            {
                src: 'https://palotoaamazontravel.com/wp-content/uploads/2024/09/amazon-3.webp',
                alt: 'Thriving Amazon',
                overlay: 'Preservation of native flora and fauna, with sustainable management practices. Positive interaction between communities and the environment.'
            },
            {
                src: 'https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2021/11/Untitled-design-88.jpg',
                alt: 'Threatened Amazon',
                overlay: 'Increase in deforestation in specific areas.Pressure on natural resources from activities like agriculture and livestock.'
            },
            {
                src: 'https://scx2.b-cdn.net/gfx/news/2021/a-deforested-area-of-r.jpg',
                alt: 'Damaged Amazon',
                overlay: 'Fragmentation of habitats due to road construction and settlements. Loss of native species and alterations in ecosystems.'
            },
            {
                src: 'https://static.dw.com/image/54488003_605.jpg',
                alt: 'Severely Damaged Amazon',
                overlay: 'Increased pollution from pesticides and industrial waste. Displacement of indigenous communities due to resource exploitation.'
            },
            {
                src: 'https://image.cnbcfm.com/api/v1/image/106975234-1636936362963-gettyimages-1228062683-AFP_1WJ4KX.jpeg?v=1636936106',
                alt: 'Degraded Amazon',
                overlay: 'Significant areas of deforested land with eroded soils. Disruption of the water cycle, affecting rivers and local climate.'
            },
            {
                src: 'https://i.natgeofe.com/n/ab13d39b-7747-4b7e-abd0-362aa4ff6267/283.jpg',
                alt: 'Critically Damaged Amazon',
                overlay: 'Significant loss of biodiversity, with many species endangered. Increase in wildfires, both intentional and accidental.'
            },
            {
                src: 'https://www.butlernature.com/wp-content/uploads/2021/06/GP0STUPV7_AmazonFiresAug20_PressMedia-1200x800.jpeg',
                alt: 'Devastated Amazon',
                overlay: 'Collapsed ecosystems with little or no chance of natural recovery. Unregulated urban development affecting the natural environment.'
            },
            {
                src: 'https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/MMD6AMVZU5TD2EGEBBMHT6Y2LA.JPG',
                alt: 'Exhausted Amazon',
                overlay: 'Unfertile soils and loss of nutrients, making regeneration impossible. Contaminated and scarce water resources.'
            },
            {
                src: 'https://www.greenpeace.org/static/planet4-international-stateless/2022/08/b9d170b7-gp1su5ae_-1024x684.jpg',
                alt: 'Destroyed Amazon',
                overlay: 'Total loss of most biodiversity. Irreversibly altered and degraded ecosystems, with massive environmental impact.'
            }
        ];

        // Retrieve session user information, or set to null if not found
        const sessUser = req.session.sessUser || null;

        // Parameters to pass to the EJS template, including carousel and session user data
        const params = {
            carrousel,
            sessUser,
        };

        // Render 'environment' template with params, displaying Amazon ecosystem info
        res.render('environment', params);
    });

// Route to render the Antarctica environment page
app.route('/environment2')
    .get((req, res) => {
        // Define carousel data array for Antarctica, each object represents an image and description
        var carrousel = [
            {
                src: 'https://www.travelandleisure.com/thmb/qnFoUlxGP3j-1C7uUm04Ut0wqjU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ice-monolith-antarctica-TRVLTOANT0518-cd3a9ff6d76f4e989d9b896a0bb15089.jpg',
                alt: 'Pristine Antarctica',
                overlay: 'Untouched landscapes, abundant marine life, and stable ice shelves supporting diverse ecosystems.'
            },
            {
                src: 'https://storage.googleapis.com/travel-web-app-1.appspot.com/flamelink/media/Antartic%20penguins.jpg?GoogleAccessId=firebase-adminsdk-g2s60%40travel-web-app-1.iam.gserviceaccount.com&Expires=16725225600&Signature=GWyZ2Q2dbCdI9jQ5molzj4QSjUKafPDhG8qTazv4A47eTqJhsKbonPjXALgRG%2FT4THnggDGbvqlQO6CWWK8IsHBNirEzxNKmiCr7x3e4WAyYBa1O2HiWQhjflavdeMz%2F%2Blbw0s8D%2Fl7K8U29S5Ux4TkyIPhHIuAL739gdj4u4jyei%2BNDuhhdjk2tO1AbLByOmnTl7TWlHeEZkeEUO7oTuPuN6m9ZgcT4G9hlOXAHQsxEYyMYjtZilBl7heEaJazK%2BL42ukjPcwDn16%2F4L0658bw6E0sW8VgPNLNFxoPAA39QBUjbmRdv7fnhG6%2FRVYLoP5YzKR4U9cI9P%2FtUXneMBg%3D%3D',
                alt: 'Balanced Ecosystem',
                overlay: 'Balanced ecosystems with thriving marine and bird species, minimal human impact.'
            },
            {
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZQYnpopmS1k-yqttBjpmZc6_We2N84DqfhA&s',
                alt: 'Melting Ice Shelves',
                overlay: 'Increasing melt rates of ice shelves, impacting habitats for seals, penguins, and other wildlife.'
            },
            {
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3FxOXhym_AxNXsHKLvB_N4ZlV9qD6h4jOg&s',
                alt: 'Stressed Ecosystem',
                overlay: 'Icebergs are melting at accelerated rates. Marine species face habitat reduction and food scarcity.'
            },
            {
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtUkK6iwe-ejvfpld_DW5wEcv-OgiDMmXutg&s',
                alt: 'Threatened Biodiversity',
                overlay: 'Increased ocean temperatures threaten biodiversity and disrupt native species migration patterns.'
            },
            {
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9eUh4vqlyB2A99oWG_waSYugWtJOWmkqybw&s',
                alt: 'Fragile Ecosystem',
                overlay: 'Vulnerable ice shelves and glaciers. Impacts on species dependent on stable, icy habitats.'
            },
            {
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWDalY4RujZi8yvlYyp_Lul8JzVET1lnE18w&s',
                alt: 'Declining Penguin Populations',
                overlay: 'Penguin populations dwindle due to habitat loss, with dwindling food resources and harsh conditions.'
            },
            {
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb330JVCDwcal7bjDxuGDC_lFKp9tncXkZog&s',
                alt: 'Severely Impacted Ice Sheets',
                overlay: 'Rapid ice sheet melting leads to rising sea levels, impacting coastlines globally.'
            },
            {
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl-s4oaL8C5Oq29r3I09vMgKu6XXielNvmRg&s',
                alt: 'Endangered Ecosystem',
                overlay: 'Lack of stable ice severely disrupts the ecosystem, affecting the Antarctic food chain and breeding patterns.'
            },
            {
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJUR2j4y75T8mAAtyIwENwQru2mW2nkz037A&s',
                alt: 'Collapsed Ice Ecosystem',
                overlay: 'Complete ecosystem collapse with minimal wildlife presence. The region has lost most of its former resilience.'
            }
        ];

        // Retrieve session user information, or set to null if not found
        const sessUser = req.session.sessUser || null;

        // Parameters to pass to the EJS template, including carousel and session user data
        const params = {
            carrousel,
            sessUser,
        };

        // Render 'environment2' template with params, displaying Antarctica ecosystem info
        res.render('environment2', params);
    });

// Route to render the Tasmania environment page
app.route('/environment3')
    .get((req, res) => {
        // Define carousel data array for Tasmania, each object represents an image and description
        var carrousel = [
            {
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTjyZlWwG1Pbsg2Y5Qiek711INFrwa1_wTzQ&s',
                alt: 'Pristine Tasmania',
                overlay: 'Untouched landscapes with unique flora and fauna, home to a thriving biodiversity and rare species like the Tasmanian devil.'
            },
            {
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO-izIhKTsurOsUSu8FuMIRdYUwaS32heKJw&s',
                alt: 'Balanced Tasmanian Ecosystem',
                overlay: 'Stable ecosystems with lush forests, clean rivers, and abundant wildlife, minimally impacted by human activity.'
            },
            {
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUfAvAGdNW7eL_SEiZ_P7dFIiGZarEdbNPYA&s',
                alt: 'Deforestation Impact',
                overlay: 'Rising deforestation rates impacting natural habitats. Increased land clearing threatens Tasmania’s biodiversity.'
            },
            {
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYiq1DBkbTlWOX6_btoLcVKVsKZcwjxKgq1w&s',
                alt: 'Stressed Ecosystem',
                overlay: 'Invasive species and habitat destruction put pressure on native wildlife, creating scarcity of resources.'
            },
            {
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7FmZYZp_m9_vnLMUDDRQ6xVb3wci-9MqnyA&s',
                alt: 'Threatened Biodiversity',
                overlay: 'Warming ocean temperatures disrupt marine life along the coasts, affecting fish populations and kelp forests.'
            },
            {
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyE1dG9ZASw-O2wY0JaSq4gIetFaN4UfaY1w&s',
                alt: 'Fragile Forest Ecosystem',
                overlay: 'Logging and mining encroach upon protected forests, altering habitats and threatening endangered species.'
            },
            {
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO96S0ptPfLcauVyso0PjhxD8K7xycdV8MZw&s',
                alt: 'Declining Tasmanian Devil Populations',
                overlay: 'Disease and habitat loss cause a decline in Tasmanian devil populations, endangering this iconic species.'
            },
            {
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV1X5ojiJKQwVIApdlt1nwUhpegSzC_O9fDQ&s',
                alt: 'Severely Impacted Coastlines',
                overlay: 'Coastal erosion and pollution threaten marine ecosystems, affecting both tourism and local fishing industries.'
            },
            {
                src: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Babel_Island_Aerial.jpg',
                alt: 'Endangered Forests',
                overlay: 'Logging practices lead to fragmented forests, with many plant and animal species struggling to survive.'
            },
            {
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSFkWjtWj18V8z_JO-bD-2fPy753S1VSSE1Q&s',
                alt: 'Critically Damaged Ecosystem',
                overlay: 'Ecosystem collapse in key areas, with irreversible loss of biodiversity and long-term environmental impacts.'
            }
        ];

        // Retrieve session user information, or set to null if not found
        const sessUser = req.session.sessUser || null;

        // Parameters to pass to the EJS template, including carousel and session user data
        const params = {
            carrousel,
            sessUser,
        };

        // Render 'environment3' template with params, displaying Tasmania ecosystem info
        res.render('environment3', params);
    });


// Route to render the map page
app.route('/map')
    .get((req, res) => {
        // Render the 'map' template and pass the API key from environment variables
        res.render('map', { apiKey: process.env.MAP_PASS });
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

        res.render("user", params); // Render 'user' template with session user data
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
        const { name, username, email } = req.body;
        const userId = req.session.userId; // Get user ID from session

        try {
            // Update user details in the database with the new values
            await appUser.findByIdAndUpdate(userId, { name, username, email }, { new: true });
            
            // Retrieve updated user data by username
            const user = await appUser.findOne({ username });
            
            // Update session data with the latest user info
            req.session.sessUser = user;
            req.session.userId = user._id;
            
            // Send a confirmation email of profile updates
            await sendEditsMail(req.body.email, {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
            });

            console.log("------->User ID: " + req.session.userId); // Log user ID for debugging
            console.log("-User profile updated"); // Confirmation log of profile update
            
            res.redirect("/user"); // Redirect to the profile page after saving changes
        } catch (error) {
            console.error("!--Error updating user profile:", error); // Log any errors encountered during update
            res.redirect('/user'); // Redirect to profile page if an error occurs
        }
    });

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log("<|Berkeley listening port 3000|>"); // Log server start and port information
});
