
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
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;
const { OAuth2Client } = require('google-auth-library'); // Import Google Auth Library
const client = new OAuth2Client('55269184028-f6oopb7bk04spr4p7ns05at5arfadl6t.apps.googleusercontent.com'); // Replace with your Google Client ID

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

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
  isAdmin: {
    type: Boolean,
    default: false
  },

  profilePicture:String // Add profilePicture field
  
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

///////////managers////////////////////
const ManagerSchema = new mongoose.Schema({
 
  email: {
    type: String,
    ref: 'User',
    unique: true // Ensure each user has only one manager

},
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true // Ensure each user has only one manager
  }});

const Manager = mongoose.model('Manager', ManagerSchema); // Define and export the Manager model directly
module.exports = Manager;
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

const members = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
 
  mobileNumber: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true
  },

  projectSummary: {
    type: String,
    required: true
  }
});

const member = mongoose.model('Members', members);
module.exports = member;


const internships= new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
 
  mobileNumber: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true
  }


});

const internship = mongoose.model('internships', internships);
module.exports = internship;



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


//////////register/////////////
app.post('/register', async (req, res) => {
  const { firstName, lastName,email, password,mobile} = req.body;

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
  const adminEmails = ['admin31@gmail.com', 'adminSama@example.com', 'admin3@example.com'];
  try {
   
    console.log('Email:', email);
    const isAdmin = adminEmails.includes(email);

    const newUser = await User.create({ firstName, lastName, email, password: hashedPassword,mobile,isAdmin});
    console.log('New user created:', newUser); // Log the newly created user
 console.log(isAdmin);
    if(isAdmin) {
      console.log('Registered as admin');

      // Create and save a new manager instance
      const newManager = new Manager({ email:newUser.email,userId: newUser._id  });
      await newManager.save()
        .then((manager) => {
          console.log('New manager created:', manager); // Log the newly created manager
        })
        .catch((error) => {
          console.error('Error creating manager:', error); // Log any error that occurs during manager creation
        });

     }

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to register user' });
  }

  
});

/////////////login////////////
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
  const manager = await Manager.findOne({ userId: user._id });

  const token = jwt.sign({ userId: user._id }, '7bI$64T*5!sKv&9Lp@8Fq#3m^2Hd', { expiresIn: "1h" });
console.log(manager);
  // Send token to the client
  console.log('Generated token:', token);
 
  res.status(200).json({ success: true, message: 'Login successful', token, isManager: manager  });
  
});     


////////////////post membership//////////////////
app.post('/membership',verifyToken ,upload.array('projectPictures'),async (req, res) => {
  try {
    const membershipData = req.body;
    const projectPictures = req.files.map(file => file.path);
    const newMembership = await Membership.create({ ...membershipData, projectPictures });
    sendEmailNotification(membershipData.email); // Assuming email is provided in the membership data

   
    res.status(201).json({ success: true, message: 'Membership application submitted successfully' });
  } catch (error) {
    console.error('Error submitting membership application:', error);
    res.status(500).json({ success: false, message: 'Failed to submit membership application' });
  }

  async function sendEmailNotification(email) {
    try {
      // Create a transporter object using SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: '   ', // your email
          pass: '  ' // app password
        }
      });
  
      // Send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Your Organization" <your_email@example.com>', // sender address
        to: email, // list of receivers
        subject: 'Membership Application Submitted', // Subject line
        text: 'Your membership application has been successfully submitted.', // plain text body
        html: '<b>Your membership application has been successfully submitted.</b>' // html body
      });
  
      console.log('Email sent:', info.messageId);
    } catch (error) {
      console.error('Error sending email notification:', error);
    }
  }
});

/////post opportunities (Internship)/////////////////
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

//////Post members////////////
app.post('/members',verifyToken, async (req, res) => {
  try {
    const { fullName, address, mobileNumber, emailAddress, projectSummary } = req.body; // Destructure variables from req.body

    // Create a new member instance using the Member model
    const newMember = new member({ fullName, address, mobileNumber, emailAddress, projectSummary });

    // Save the new member to the database
    await newMember.save();


    res.status(201).json({ success: true, message: 'member added successfully'});
  } catch (error) {
    console.error('Error adding member application:', error);
    res.status(500).json({ success: false, message: 'Failed to add member' });
  }
});

////////////post internship/////
app.post('/internships',verifyToken, async (req, res) => {
  try {
    const { fullName, address, mobileNumber, emailAddress } = req.body; // Destructure variables from req.body

    // Create a new member instance using the Member model
    const newIntern = new internship({ fullName, address, mobileNumber, emailAddress });

    // Save the new member to the database
    await newIntern.save();


    res.status(201).json({ success: true, message: 'internship added successfully'});
  } catch (error) {
    console.error('Error adding internship application:', error);
    res.status(500).json({ success: false, message: 'Failed to add internship' });
  }
});

// GET user to fetch user by ID
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

// GET user to fetch user by email
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

////////////get prfile data////////////
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

/////////////update profile////////
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


    /////////////////////////
    const { oldPassword, newPassword } = req.body;

    // Check if oldPassword and newPassword are provided
    if (oldPassword && newPassword) {
      // Compare old password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(oldPassword, user.password);
      if (!passwordMatch) {
        console.log('Incorrect old password');
        return res.status(400).json({ success: false, message: 'Incorrect old password' });
      }

      // Validate new password strength
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        console.log('New password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character');

        return res.status(400).json({
          success: false,
          message: 'New password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character',
        });
      }

      // Hash and update the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
    }
    ////////////////////////////////////////////
    // Save updated user
    await user.save();

    return res.status(200).json({ success: true, message: 'User profile updated successfully', user });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

///////////////get managers///////////////
app.get('/managers',verifyToken , async (req, res) => { 
  try {
    // Find all managers
    const managers = await Manager.find();

    // Return the list of managers
    return res.status(200).json({ success: true, managers });
  } catch (error) {
    console.error('Error fetching managers:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

//////////////get membership forms///////////
app.get('/Gmembership',verifyToken, async (req, res) => {
  try {
    // Fetch membership data from the database
    const membershipData = await Membership.find({});
    return res.status(200).json({ success: true, membershipData });
  } catch (error) {
    console.error('Error fetching managers:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/Gmembers',verifyToken, async (req, res) => {
  try {
    // Fetch membership data from the database
    const membersData = await member.find({});
    return res.status(200).json({ success: true, membersData });
  } catch (error) {
    console.error('Error fetching managers:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

////get interns/////////
app.get('/interns',verifyToken, async (req, res) => {
  try {
    // Fetch membership data from the database
    const internshipData = await internship.find({});
    return res.status(200).json({ success: true, internshipData });
  } catch (error) {
    console.error('Error fetching managers:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

/////////////get internship forms//////////////////
app.get('/Gopportunities', verifyToken, async (req, res) => {
  try {
    // Fetch membership data from the database
    const opportunitiesData = await Opportunities.find({});
    return res.status(200).json({ success: true, opportunitiesData });
  } catch (error) {
    console.error('Error fetching managers:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});


//////delete membership form///////////////////////
app.delete('/membership/:id', verifyToken, async (req, res) => {
  try {
    const membershipId = req.params.id;

    // Find the membership form by ID and delete it
    const deletedMembership = await Membership.findByIdAndDelete(membershipId);

    if (!deletedMembership) {
      return res.status(404).json({ success: false, message: 'Membership form not found' });
    }

    return res.status(200).json({ success: true, message: 'Membership form deleted successfully' });
  } catch (error) {
    console.error('Error deleting membership form:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

////delete opportunity////////////
app.delete('/opportunity/:id', verifyToken, async (req, res) => {
  try {
    const OppId = req.params.id;

    // Find the membership form by ID and delete it
    const deletedOpp = await Opportunities.findByIdAndDelete(OppId);

    if (!deletedOpp) {
      return res.status(404).json({ success: false, message: 'Opportunities form not found' });
    }

    return res.status(200).json({ success: true, message: 'Opportunities form deleted successfully' });
  } catch (error) {
    console.error('Error deleting Opportunity form:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

