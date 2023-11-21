const express = require('express');
const jwt= require('jsonwebtoken')
const nodemailer = require("nodemailer");
const app = express();
app.use(express.json());

const cors = require('cors'); // Import the cors middleware
app.use(cors());
app.use(cors({ origin: '*' }))


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Define your routes and middleware here

// app.js (continued)
const mongoose = require('mongoose');
mongoose.set("strictQuery",true)
const dbURL = 'mongodb+srv://StrikeOut:Rak1237@cluster0.oz1b53i.mongodb.net/'; // Replace with your MongoDB URL  mongodb://localhost:27017/?readPreference=primary&ssl=false&directConnection=true



const connection = async () => {
    try {
        await mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
        
        app.listen(3007, () => {
            
        });
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}


connection()

const taskSchema = new mongoose.Schema({
  username: String,
  password: String,
  emailAddress:String
});

const Task = mongoose.model('Task', taskSchema);


// Declare globalOTP at the top of your file


app.post('/tasks', async (req, res) => {
  const { username, password, emailAddress } = req.body;


  try {
    const existingUser = await Task.findOne({ $or: [{ username }, { emailAddress }] }).exec();

    if (existingUser) {
      

      if (existingUser.username === username) {
        

        res.send("Username already exists");
      
        return;
      }

      if (existingUser.emailAddress === emailAddress) {
      

        res.send("Email Already exits");
        return;
      }
    } else {
      // Create a transporter object using SMTP transport
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: "rakeshreddynanim30@gmail.com",
          pass: "vglq sung exaj lird",
        },
        tls: {
          rejectUnauthorized: false,
        }
      });

      // Generate a random OTP (e.g., 6 digits)
      const generateOTP = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
      };

      // Email OTP to the user
      
      globalOTP = generateOTP();

      req.session = {
        username,
        password,
        emailAddress,
        globalOTP,
      };

      const mailOptions = {
        from: "rakeshreddynanim30@gmail.com",
        to: emailAddress,
        subject: "Your OTP for Email Verification",
        text: `Hello, I am Rakesh. Please provide your OTP. Your OTP is: ${globalOTP}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.send("Error sending email: " + error);
        } else {
          res.send("OTP Sent to your registered email id");
        }
      });

      
    }
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.post('/verify-otp', async (req, res) => {
  const { otp } = req.body;
  const { username, password, emailAddress, globalOTP } = req.session || {};

  if (otp === globalOTP) {
    // OTP is correct, so proceed to create the user
    try {
      await Task.create({ username:username, password:password, emailAddress:emailAddress });
      res.status(200).send("User registered successfully!");
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  } else {
    // OTP is incorrect
    res.send("OTP verification failed");
  }
});



app.post('/login',async(req,res)=>{
    const {username,password} = req.body
    const payload={username:username}
    const jwtToken=jwt.sign(payload,"IAM_RAKESH")
 

    try{
        const existingUser = await Task.findOne({ $and: [{ username }, { password }] }).exec();
        
        
        if (existingUser!==null){
            let resultObject={jwtToken:jwtToken,resultMsg:"Login Successfull",details:{username:existingUser.username,password:existingUser.password.length,emailAddress:existingUser.emailAddress}}
            res.send(resultObject)
        }else{
            res.send("User NotFound")
          
        }

    }catch (error) {
        res.status(500)
        res.send( 'Error creating user' )
    }

})


const productDetailsSchema = new mongoose.Schema({
    category: String,
    productName: String,
    couponCode:String,
    expiresOn:Date,
    description: String,
    imageUrl: String,
    username:String,
  });
  
  const productDetails = mongoose.model('productDetails', productDetailsSchema);
  

  
      






app.post('/productDetails', async (req, res) => {
  const { category, productName,couponCode,expiresOn,description, imageUrl,jwtTokenClient } = req.body;
  jwt.verify(jwtTokenClient, "IAM_RAKESH", async (error, payload) => {
    if (error) {
      res.status(401).json({ error: 'Invalid Access Token' });
    }else{
    const username=payload.username
    await productDetails.create({ category, productName,couponCode,expiresOn,description, imageUrl,username})
    .then(() => {
      res.status(200)
      
      res.send("Data posted successfully")
    })
    .catch((error) => {
      res.status(500);
      res.send('Error posting data')
    })}})
});


app.get('/cards', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extract the token from the "Authorization" header
    const payload = await jwt.verify(token, "IAM_RAKESH");
    
    if (!payload) {
      res.status(401).json({ error: 'Invalid Access Token' });
      return;
    }

    const cards = await productDetails.find(); // Retrieve all documents from the "productDetails" collection
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cars' });
  }
});














app.post('/forgotPassword-Email-Verification', async (req, res) => {
  const { email } = req.body;

  EmailAddress = email

  try {
    const existingUser = await Task.findOne({ emailAddress: email }).exec();
    console.log(existingUser)
    if (existingUser) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: "rakeshreddynanim30@gmail.com",
          pass: "vglq sung exaj lird",
        },
        tls: {
          rejectUnauthorized: false,
        }
      });

      // Generate a random OTP (e.g., 6 digits)
      const generateOTP = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
      };

      // Email OTP to the user
      const generatedOTP = generateOTP();
      globalOTP = generatedOTP;

      const mailOptions = {
        from: "rakeshreddynanim30@gmail.com",
        to: EmailAddress,
        subject: "Your OTP for Email Verification",
        text: `Hello, I am Rakesh. Please provide your OTP. Your OTP is: ${generatedOTP}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email: " + error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.send("OTP Sent to your registered email id");
     
      }
      else{
         res.send("User not Registered")
      }


  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});



app.post('/verify-otp-forgotPassword', async (req, res) => {
  const { otp } = req.body;


  if (otp === globalOTP) {
   res.send("Correct OTP")
  } else {
    // OTP is incorrect
    res.send("OTP Verification failed")
  }
});


app.put('/update-password',async(req,res)=>{
  const {password,emailAddress}=req.body
  if (password.length<6){
    
    res.send("Please enter a password of atleast 6 characters")
  }else{
  try{
    const response= await Task.updateOne({ emailAddress:emailAddress },
    { $set: { password: password } })
    
    res.send(response)
  }catch (e){
    res.send(e.message)
  }}
})




