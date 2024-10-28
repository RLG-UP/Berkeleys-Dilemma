require('dotenv').config();

const bcrypt = require('bcrypt');
const express = require('express');
const https = require('https');
const app = express();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const session = require('express-session');

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
            html: '<div style="font-family: Arial, sans-serif; color: #E7E5DF; line-height: 1.6; background-color: #393e41; padding: 20px; text-align: right;"><h1 style="color: #FF7F11; font-size: 2.5em; margin: 0;">Keep on Killing!</h1><h3 style="color: #FF7F11;">Your hypocrisy is burning the planet down, causing <strong>hurricanes</strong>, <strong>death</strong>, and <strong>extinction</strong>.</h3><p style="font-size: 1.2em; margin: 20px 0;">Feel the satisfaction? Enjoy watching as the world suffocates under the weight of your decisions. Every luxury, every convenience, every act of apathy—is fuel to the fire that’s reducing our world to ash.</p><p style="font-size: 1.2em; margin: 20px 0;">Here are the innocent lives you’re wiping out without a second thought:</p><div><img src="https://i.pinimg.com/originals/e0/ca/a4/e0caa4176077632b0c048b06d4ef163c.gif" alt="Animal suffering" style="width: 180px; margin: 10px;"><img src="https://i.pinimg.com/originals/7d/2f/ae/7d2faebec61ec4d14f7cd623833f35cc.gif" alt="Animal suffering" style="width: 180px; margin: 10px;"><img src="https://64.media.tumblr.com/70cb4804b35cca0d4892c87a5165a607/tumblr_no73imiY6S1qgwf6po4_400.gif" alt="Animal suffering" style="width: 180px; margin: 10px;"><img src="https://media1.giphy.com/media/lnbKvnDO4yYwYzOmru/200w.gif?cid=82a1493b0i4e652llmr3blaqc7p44uf5l3nizroem1n0lr87&ep=v1_gifs_related&rid=200w.gif&ct=g" alt="Animal suffering" style="width: 180px; margin: 10px;"></div><div style="margin: 30px 0; padding: 20px; background-color: #2d3133; border-right: 5px solid #FF7F11;"><p style="font-style: italic; font-size: 1.3em; color: #E7E5DF;">“Many people would kill a man to take the fat from his corpse and use it to grease their boots.”</p><p style="text-align: right; color: #888; font-size: 0.9em; margin: 0;">— Arthur Schopenhauer</p></div><p style="font-size: 1.2em; color: #FF7F11; font-weight: bold;">Wake up before it’s too late.</p><p style="font-size: 0.9em; color: #888;">Your choices are written in blood. Make sure you can live with them.</p></div>',
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    }catch(error){
        return error;
    }
};


async function sendEditsMail(sendEmail, user) {
    try {
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

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
};
//END OF EMAILING FUNCTIONS


userSchema.pre('save', async function (next) {
    console.log("--Inside pre-save hook"); // Debugging
    console.log("--Is password modified? ", this.isModified('password')); // Debugging

    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(slt); // Ensure slt is a valid number
            this.password = await bcrypt.hash(this.password, salt);
            console.log("-Password hashed: ", this.password);
        } catch (err) {
            console.error("!--Error in password hashing", err);
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
            console.log('--User created successfully!');
        } else {
            // Set dopple flag to indicate a duplicate user
            dopple = true;
            console.log("--Doppleganger found, no user created");
        }

    } catch (error) {
        console.error("!--Error creating user:", error);
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

        console.log("--->Doppleganger: " + dopple);
        res.render('account', params);
    })
    .post(async (req, res)=>{
        const username = req.body.username;
        const password = req.body.password;
        try {
            const user = await appUser.findOne({ username });
            
            if (!user) {
                console.log("---->UserName: " + username);
                right_log = false;
                var params = {
                    apiKey: process.env.MAP_PASS,
                    dopple,
                    right_log,
                };
                return res.render('account', params);
            }
    
            console.log("-Comparing passwords:");
            console.log("-->Plain Password: ", password); // The password entered by the user
            console.log("-->Hashed Password: ", user.password); // The hashed password from the database
    
            const isMatch = await bcrypt.compare(password.trim(), user.password);
            console.log("--->Passwords match: ", isMatch); // Log the result of the comparison
    
            if (isMatch) {
                req.session.sessUser = user;
                req.session.userId = user._id;
                return res.redirect('/index');
            } else {
                right_log = false;
                var params = {
                    apiKey: process.env.MAP_PASS,
                    dopple,
                    right_log,
                };
                console.log("!--Incorrect password for user: ", username); // Log for debugging
                return res.render('account', params);
            }
            
        } catch (error) {
            console.error("!--Error during login:", error);
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

        console.log("---->User: " + sessUser);
        res.render('index', params);
    });

app.route('/environment')
    .get((req, res)=>{
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
        
        const sessUser = req.session.sessUser || null;
        const params = {
            carrousel,
            sessUser,
        }

        
        res.render('environment', params);
    });


    app.route('/environment2')
    .get((req, res)=>{
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
        
        
        const sessUser = req.session.sessUser || null;
        const params = {
            carrousel,
            sessUser,
        }

        
        res.render('environment2', params);
    });

    app.route('/environment3')
    .get((req, res)=>{
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
        
        
        
        const sessUser = req.session.sessUser || null;
        const params = {
            carrousel,
            sessUser,
        }

        
        res.render('environment3', params);
    });


app.route('/map')
.get((req, res)=>{
    res.render('map', { apiKey: process.env.MAP_PASS });
});

app.route('/log-out')
    .get((req, res)=>{
        req.session.destroy((err) => {
            if (err) {
                console.log("!--Impossible to log out: " + err);
            }
            res.redirect('/');
        });
    });

app.route('/user')
    .get((req, res)=>{
        const sessUser = req.session.sessUser || null;
       
        var params = {
            sessUser,
        };

        res.render("user", params);
    });

app.route('/edit-profile')
    .get((req, res)=>{
        const sessUser = req.session.sessUser || null;
       
        var params = {
            sessUser,
        };

        res.render("editUser", params);
    });

app.route("/save-profile")
    .post(async (req, res) => {
        const { name, username, email } = req.body; // Extract data from the request body
        const userId = req.session.userId; // Assuming you have user ID stored in session

        try {
        // Update the user details in the database
        await appUser.findByIdAndUpdate(userId, { name, username, email }, { new: true });
        const user = await appUser.findOne({ username });
        req.session.sessUser = user;
        req.session.userId = user._id;
        const updatedEmail = req.body.email;
        const updatedName = req.body.name;
        const updatedUsername = req.body.username;
        await sendEditsMail(updatedEmail, {
            name: updatedName,
            email: updatedEmail,
            username: updatedUsername,
        });
        console.log("------->User ID: " + req.session.userId);
        console.log("-User profile updated");
        
        res.redirect("/user"); // Redirect to the profile page after saving
        } catch (error) {
        console.error("!--Error updating user profile:", error);
        res.redirect('/user');
        }
    });



app.listen(3000, ()=>{
    console.log("<|Berkeley listening port 3000|>");
  });
  