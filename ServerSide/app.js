
const express = require('express');
const app = express();
app.use(express.json())

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

/*app.post('/tasks', (req, res) => {
    const { username, password,emailAddress } = req.body;

    Task.findOne({emailAddress:emailAddress},(err,existingTask)=>{
      if (err) {
        return res.status(500).json({ error: 'Error checking for duplicate username' });
    }
     if (existingTask){
      return res.status(422).send({emailAddress:"emailAddress already exists"})
     }
      
  


    Task.findOne({ username: username }, (err, existingTask) => {
      if (err) {
          return res.status(500).json({ error: 'Error checking for duplicate username' });
      }

      if (existingTask) {
        console.log('User with the same username already exists');
          return res.status(409).send({username:"Username already exists"})
      }
      

      Task.findOne({password:password},(err,existingTask)=>{
         if (err) {
          return res.status(500).json({ error: 'Error checking for duplicate username' });
      }
      if (password.length < 6) {
        console.log("Password is too short (minimum 6 characters)")
        return res.status(400).json({ error: 'Password is too short (minimum 6 characters)' });
    }

      })

      Task.create({ username, password, emailAddress })
      .then((task) => {
        res.json(task);
        res.status(200)
        console.log("data inserted")
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error creating task' });
      });

     
  
    


  });

})
  
}) */

/*app.post('/tasks', (req, res) => {
  const { username, password, emailAddress } = req.body;

  // Check for duplicate username or emailAddress
  Task.findOne({ $or: [{ username }, { emailAddress }] }, (err, existingTask) => {
      if (err) {
          return res.status(500).json({ error: 'Error checking for duplicate username or emailAddress' });
      }

      if (existingTask) {
          const errors = {};
          if (existingTask.username === username) {
              errors.username = 'Username already exists';
              return res.status(409).json(errors);
          }
          if (existingTask.emailAddress === emailAddress) {
              errors.emailAddress = 'Email already exists';
              return res.status(407).json(errors);
          }
          
      }

     
      Task.create({ username, password, emailAddress })
          .then((task) => {
              res.status(200); // Status 201 for resource creation
              console.log('Data inserted');
          })
          .catch((error) => {
              res.status(500).json({ error: 'Error creating task' });
          });
  });
});*/

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

    try{
        const existingUser = await Task.findOne({ $and: [{ username }, { password }] }).exec();
        
        if (existingUser!==null){
            res.send("Valid User")
        }else{
            res.send("User NotFound")
        }

    }catch (error) {
        res.status(500)
        res.send( 'Error creating user' )
    }

})
  
       /* if (existingUser) {
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
    }*/







module.exports = app
