
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator'); // Add email validation library
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 3000;
const { OAuth2Client } = require('google-auth-library'); // Import Google Auth Library
const client = new OAuth2Client('55269184028-f6oopb7bk04spr4p7ns05at5arfadl6t.apps.googleusercontent.com'); // Replace with your Google Client ID

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://sama:S123456@cluster0.28oglsd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware to verify JWT token and extract user information
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization; // Assuming token is sent in the 'Authorization' header

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token not provided' });
  }

  jwt.verify(token, '7bI$64T*5!sKv&9Lp@8Fq#3m^2Hd', (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    req.user = decoded; // Attach decoded user information to the request object
    next(); // Call the next middleware or route handler
  });
};



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });


const UserSchema = new mongoose.Schema({

  firstName: {
    type: String, // Adding firstName field
    required: true
},
lastName: {
    type: String, // Adding lastName field
    required: true
},
  email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
          validator: emailValidator.validate,
          message: props => `${props.value} is not a valid email address!`
      }
  },
  password: {
      type: String,
      required: true
  },


  mobile:{
    type: String, // Adding lastName field
    required: true
  },

  profilePicture:String // Add profilePicture field
  
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

////////////////////////////////////////////////////
const MembershipSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
 
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  socialMediaLink: {
    type: String,
    required: true
  },
  projectLocation: {
    type: String,
    required: true
  },
  projectSector: {
    type: String,
    required: true
  },
  projectSummary: {
    type: String,
    required: true
  },
  projectPictures: [String] 
});

const Membership = mongoose.model('Membership', MembershipSchema);
module.exports = Membership;

const OpportunitiesSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
 
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cv: [String]
})
const Opportunities = mongoose.model('opportunities', OpportunitiesSchema);
module.exports=Opportunities;


app.post('/membership',verifyToken ,upload.array('projectPictures'),async (req, res) => {
  try {
    const membershipData = req.body;
    const projectPictures = req.files.map(file => file.path);
    const newMembership = await Membership.create({ ...membershipData, projectPictures });
    res.status(201).json({ success: true, message: 'Membership application submitted successfully' });
  } catch (error) {
    console.error('Error submitting membership application:', error);
    res.status(500).json({ success: false, message: 'Failed to submit membership application' });
  }
});


app.post('/opportunities',verifyToken, upload.array('cv'), async (req, res) => {
  try {
    const oppData = req.body;
    const cv = req.files.map(file => file.path);
    const newOpp = await Opportunities.create({ ...oppData, cv });
    res.status(201).json({ success: true, message: 'opp application submitted successfully' });
  } catch (error) {
    console.error('Error submitting opp application:', error);
    res.status(500).json({ success: false, message: 'Failed to submit opp application' });
  }
});



///////////////////////////////////

app.post('/register', async (req, res) => {
  const { firstName, lastName,email, password,mobile  } = req.body;

  // Validate email format
  if (!emailValidator.validate(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email format' });
  }

  // Validate password strength
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character',
    });
  }


  // Ensure other fields are provided as well
  if ( !firstName || !lastName||!email || !password ||!mobile ) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' });
}
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({ firstName, lastName, email, password: hashedPassword,mobile});
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to register user' });
  }

  
});




app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ success: false, message: 'Incorrect password' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, '7bI$64T*5!sKv&9Lp@8Fq#3m^2Hd', { expiresIn: "1h" });

  // Send token to the client
  console.log('Generated token:', token);
 
  res.status(200).json({ success: true, message: 'Login successful', token });
  
});





// GET endpoint to fetch user by ID
app.get('/user/:id', verifyToken,async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by user ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Return the user details
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET endpoint to fetch user by email
app.get('/userE/:email', verifyToken, async (req, res) => {
  try {
    const email = req.params.email;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Return the user details
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});


app.get('/Gprofile', verifyToken, async (req, res) => {
  try {
      const userId =req.user.userId;

      // Find the user by userId
      const user = await User.findById(userId);

      // Check if the user exists
      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Return the user's profile data
      return res.status(200).json({ success: true, user: { firstName: user.firstName, lastName: user.lastName , email:user.email , mobile:user.mobile} });
  } catch (error) {
      console.error('Error fetching user profile:', error);
      return res.status(500).json({ success: false, message: 'Server error' });
  }
});


//////////////////////////////////////////////

/*const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = './uploads';
    fs.mkdirSync(uploadDir, { recursive: true }); // Create the uploads directory if it doesn't exist
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });*/

// PUT endpoint for updating user profile
/*app.put('/profile', verifyToken, async (req, res) => {
  try {
    // Extract user ID, first name, and last name from request body
    const { firstName, lastName } = req.body;
    const email = req.user.userId;

    // Find the user by ID and update the first name and last name
    const user = await User.findByIdAndUpdate(email, { firstName, lastName }, { new: true });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Return success response with updated user profile
    return res.status(200).json({ success: true, message: 'User profile updated successfully', user });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});*/


app.put('/profile', verifyToken, upload.single('profilePicture'), async (req, res) => {
  try {
    const userId = req.user.userId;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update user's profile picture
    if (req.file) {
      user.profilePicture = req.file.path; // Use the path of the uploaded file
    }

    // Update user's first name and last name
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;

    // Save updated user
    await user.save();

    return res.status(200).json({ success: true, message: 'User profile updated successfully', user });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

