require('dotenv').config();
const transporter = require('./emailServ.js');
const { google } = require('googleapis');

// OAuth2 Configuration
const CLIENT_ID = process.env.CLIENT_ID; // Your Google Client ID
const CLIENT_SECRET = process.env.CLIENT_SECRET; // Your Google Client Secret
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'; // Default redirect URI for testing
const REFRESH_TOKEN = process.env.REFRESH_TOKEN; // Get this from OAuth2 Playground

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendWelcomeEmail(userEmail) {
    try {
      // Obtain the access token
      const accessToken = await oAuth2Client.getAccessToken();
  
      // Configure transporter with OAuth2 authentication
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.EMAIL,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken.token,
        },
      });
  
      // Email options
      const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: 'Welcome to Berkeleys Dilemma!',
        text: 'Thank you for signing up!',
        html: '<h1>Keep on Killing!</h1><h3>Your hypocresy is burning the planet down, causing <strong>hurricanes</strong> and <strong>death</strong></h3><p>We hope you are enjoying watching how the planet f&#64;&#37;!ing dies!!!!! Have a look to some of the animals you are killing!</p><img src="https://i.pinimg.com/originals/e0/ca/a4/e0caa4176077632b0c048b06d4ef163c.gif"><img src="https://i.pinimg.com/originals/7d/2f/ae/7d2faebec61ec4d14f7cd623833f35cc.gif"><img src="https://64.media.tumblr.com/70cb4804b35cca0d4892c87a5165a607/tumblr_no73imiY6S1qgwf6po4_400.gif"><img src="https://media1.giphy.com/media/lnbKvnDO4yYwYzOmru/200w.gif?cid=82a1493b0i4e652llmr3blaqc7p44uf5l3nizroem1n0lr87&ep=v1_gifs_related&rid=200w.gif&ct=g"><p>Happy hunting!!!</p>',
      };
  
      // Send email
      const result = await transporter.sendMail(mailOptions);
      console.log('Email sent:', result);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }


module.exports = sendWelcomeEmail;