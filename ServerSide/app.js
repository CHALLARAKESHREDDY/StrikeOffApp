const express = require('express');
const jwt= require('jsonwebtoken')
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
const dbURL = 'mongodb://127.0.0.1:27017/mydbname'; // Replace with your MongoDB URL  mongodb://localhost:27017/?readPreference=primary&ssl=false&directConnection=true



const connection = async () => {
    try {
        await mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
        app.listen(3007, () => {
            console.log(`Server is running on port ${3007}`);
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



app.post('/tasks', async (req, res) => {
  const { username, password, emailAddress } = req.body;
  

  try {
      const existingUser = await Task.findOne({ $or: [{ username }, { emailAddress }] }).exec();

      if (existingUser) {
          const errors = {};

          if (existingUser.username === username) {
              errors.username = 'Username already exists';
            
              res.send("Username already exists")
              return res.status(409)
          }

          if (existingUser.emailAddress === emailAddress) {
              errors.emailAddress = 'Email already exists';
           
              res.send("Email Already exits")
              return res.status(407)
          }

         
      }

    
      else{
        await Task.create({ username, password, emailAddress })
      .then((task) => {
           res.status(200)
         
          res.send("User registered successfully!")
      })
      .catch((error) => {
          res.status(500).json({ error: 'Error creating task' });
      }); }

    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
      res.send( {error: 'Error creating user' })
  }
     
});


app.post('/login',async(req,res)=>{
    const {username,password} = req.body
    const payload={username:username}
    const jwtToken=jwt.sign(payload,"IAM_RAKESH")
 

    try{
        const existingUser = await Task.findOne({ $and: [{ username }, { password }] }).exec();
        
        if (existingUser!==null){
            let resultObject={jwtToken:jwtToken,resultMsg:"Login Successfull"}
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
  
 /* app.post('/productDetails', async (req, res) => {
    const { category, productName, description, imageUrl } = req.body;
    productDetails
      .create({ category, productName, description, imageUrl })
      .then(() => {
        res.status(200);
        res.send('Data posted Successfully!');
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error posting Data' });
      });
  });
  */
  
      






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


//const jwt = require('jsonwebtoken'); // Make sure to import the 'jsonwebtoken' library
 // Make sure to import the 'jsonwebtoken' library

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
    res.status(500).json({ error: 'Error fetching cards' });
  }
});
