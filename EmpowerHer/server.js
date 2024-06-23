
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
const paypal = require('paypal-rest-sdk');
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



paypal.configure({
  mode: 'sandbox', // Set to 'live' for production
  client_id: 'Ad9MEM-nFyEA2B_4JFJGjKz3aqUY8KkU73KNsAyZfy_DPFv7hFZAFGUH62_RuNeG71iM8qnJDIdh8EFF',
  client_secret: 'EB61GTpP1Qm8fxZAbUDgIiG3su1srCLVyDMitNkXwl35ov_Sa18TdWXtf0ze0L_e7Igu-uem4F9ULbRO'
});

// Route to create a PayPal payment
app.post('/create-payment', async (req, res) => {
  const { amount, currency, description } = req.body;

  // Payment details
  const paymentData = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: 'http://192.168.1.120:3000/success',
      cancel_url: 'http://192.168.1.120:3000/cancel',
    },
    transactions: [
      {
        amount: {
          total: amount.toFixed(2),
          currency,
        },
        description,
      },
    ],
  };

  try {
    // Create a PayPal payment
    paypal.payment.create(paymentData, (error, payment) => {
      if (error) {
        console.error('Error creating PayPal payment:', error);
        res.status(500).json({ success: false, message: 'Failed to create PayPal payment' });
      } else {
        // Extract the approval URL from the payment response
        const approvalUrl = payment.links.find(link => link.rel === 'approval_url').href;
        res.json({ success: true, approvalUrl }); // Send approvalUrl back to the client
      }
    });
  } catch (error) {
    console.error('Error creating PayPal payment:', error);
    res.status(500).json({ success: false, message: 'Failed to create PayPal payment' });
  }
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });



const notificationSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Notification = mongoose.model('Notification', notificationSchema);

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
  },
  skills: {
    type: String, 
    required: true
  },
  employeeId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Members',
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
  skills: {
    type: String, 
    required: true
  },
  cv: [String]
})
const Opportunities = mongoose.model('opportunities', OpportunitiesSchema);
module.exports=Opportunities;


const TaskSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Members", // Reference to the Member model
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  progress: {
    type: String,
    required: false,
    default: '0%', 
  },
  status:{
    type :String,
    required:false,
    default: 'in progress'
  }
});
const Task = mongoose.model("tasks", TaskSchema);


const ProductSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Members",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required:true,
  },
  quantity:{
    type: String,
    required:true,
  },
  images: [String],
});

const Product = mongoose.model("products", ProductSchema);



const productSaleSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Assuming productId refers to a product in another collection
  quantity: { type: Number, required: true },
});

const ProductSale = mongoose.model("Sales", productSaleSchema);

const CustomersSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  productId: { type: mongoose.Schema.Types.ObjectId,
     ref: 'Product', 
     required: true },
  quantity: { type: Number,
     required: true },
  Country: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  Street: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true
  },
  TotalAmount: {
    type: String,
    required: true,
    },
  date: {
    type: Date,
    default: Date.now, 
    },
});

const Customers = mongoose.model("Customers", CustomersSchema); 

const EventsSchema = new mongoose.Schema({

  description: {
    type: String,
    required: true,
  },

 maxAttendance:{
  type: Number,
  required: true 
 },
 Attendance:{
  type: Number,
 },
  date: {
    type: Date,
    },

    images: [String],

});

const Events = mongoose.model("events", EventsSchema); 
module.exports = Events; // Export model

///productSales//////
app.post('/purchase', async (req, res) => {
  const { cartItems } = req.body;

  try {
      // Loop through cart items
      for (const item of cartItems) {
          // Check if the product already exists for the user
          const existingProductSale = await ProductSale.findOne({productId: item._id });

          if (existingProductSale) {
              // If the product exists, update the quantity
              existingProductSale.quantity += item.quantity;
              await existingProductSale.save();
          } else {
              // If the product doesn't exist, create a new entry
              const productSale = new ProductSale({
                  productId: item._id,
                  quantity: item.quantity,
                  
              });
              await productSale.save();
          }
      }

      res.json({ success: true, message: 'Purchase successful' });
  } catch (error) {
      console.error('Error purchasing:', error);
      res.status(500).json({ success: false, message: 'Failed to process purchase' });
  }
});

app.post('/Customers', async (req, res) => {
  const { userId, cartItems, Country, City, Street, mobileNumber,TotalAmount } = req.body;
  try {
    if (!userId || !Country || !City || !Street || !mobileNumber || !cartItems || !Array.isArray(cartItems)) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
  }
        for (const item of cartItems) {
        const customerEntry = new Customers({
          userId,
          productId: item._id,
          quantity: item.quantity,
          Country: Country,
          City: City,
          Street: Street,
          mobileNumber: mobileNumber,
          TotalAmount:TotalAmount,
          date: new Date()        });
        await customerEntry.save();
      }
      res.json({ success: true, message: 'Customer details saved successfully' });
  } catch (error) {
    console.error('Error saving customer data:', error);
    res.status(500).json({ success: false, message: 'Failed to process customer details' });
  }
});

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


  // Ensure  other fields are provided as well
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

app.post('/events',verifyToken ,upload.array('images'),async (req, res) => {
  try {
    const { description, maxAttendance, date } = req.body;

    const images = req.files.map(file => file.path);

    if (isNaN(maxAttendance)) {
      return res.status(400).json({ success: false, message: 'maxAttendance must be a number' });
    }

    // Validate date is a valid date
    if (isNaN(Date.parse(date))) {
      return res.status(400).json({ success: false, message: 'Invalid date format' });
    }
    const newEvent = await Events.create({
      description,
      maxAttendance: Number(maxAttendance), // Convert to number explicitly
      date: new Date(date), // Convert to Date object explicitly
      images,
    });
    res.status(201).json({ success: true, message: 'Event added successfully' });
    console.log('Received description:', req.body.description);

  } catch (error) {
    console.error('Error adding event :', error);
    res.status(500).json({ success: false, message: 'Failed to add event' });
  }
});

app.get("/events", async (req, res) => {
  try {
    const events = await Events.find();

    if (!events) {
      return res
        .status(404)
        .json({ success: false, message: "No events found" });
    }
    const productsWithPictures = events.map((event) => {
      const { images, ...rest } = event.toObject();
      const pictureUrls = images.map(
        (picture) =>
          `${req.protocol}://${req.get("host")}/uploads/${path.basename(
            picture
          )}`
      );
      return { ...rest, images: pictureUrls };
    });

    return res
      .status(200)
      .json({ success: true, events: productsWithPictures });
  } catch (error) {
    console.error("Error fetching products :", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

app.put('/attend/:id', async (req, res) => {
  const eventId = req.params.id;
  const { Attendance } = req.body;

  try {
    const event = await Events.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    event.Attendance = Attendance; // Update attendance
    await event.save();

    return res.status(200).json({ success: true, message: 'Attendance updated successfully', event });
  } catch (error) {
    console.error('Error updating attendance:', error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
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

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'samafadah2001@gmail.com', // your email
    pass: 'apwt fkgw bnng ycxp' // app password
  }
});

// Route to send email
app.post('/send-email', async (req, res) => {
  const { email, fullName } = req.body;

  const mailOptions = {
    from: 'samafadah2001@gmail.com',
    to: email,
    subject: 'Internship Approval',
    text: `Dear ${fullName},\n\nCongratulations! Your request to become an intern has been approved.\n\nBest regards,\nEmpowerHer`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

app.post('/send-email-task', async (req, res) => {
  const { memberId, description, deadline } = req.body;

  try {
    // Fetch member details using memberId
    const memberResponse = await fetch(`http://localhost:3000/members/${memberId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const memberData = await memberResponse.json();
    if (!memberData.success) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    const member = memberData.Member;
    const email = member.email || member.emailAddress; // Check both possible fields
    const { fullName } = member;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Member does not have an email address' });
    }

    const mailOptions = {
      from: 'samafadah2001@gmail.com',
      to: email,
      subject: 'New Task Assignment',
      text: `Hello ${fullName},

We are pleased to inform you that you have been assigned a new task. Below are the details:

Description: ${description}
Due Date: ${deadline}

Please make sure to complete it by the due date.

Thank you for your dedication and hard work.

Best regards,
The EmpowerHer Team`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error assigning task or sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to assign task or send email' });
  }
});

////////////post internship/////
app.post('/internships',verifyToken, async (req, res) => {
  try {
    const { fullName, address, mobileNumber, emailAddress,skills } = req.body; // Destructure variables from req.body

    // Create a new member instance using the Member model
    const newIntern = new internship({ fullName, address, mobileNumber, emailAddress,skills });

    // Save the new member to the database
    await newIntern.save();


    res.status(201).json({ success: true, message: 'internship added successfully'});
  } catch (error) {
    console.error('Error adding internship application:', error);
    res.status(500).json({ success: false, message: 'Failed to add internship' });
  }
});

/////post task////
app.post("/tasks", verifyToken, async (req, res) => {
  try {
    const { memberId, description, deadline } = req.body;

    // Create a new task
    const newTask = await Task.create({
      memberId,
      description,
      deadline,
      progress: '0%', // Set default progress
    });

    // Fetch member details using memberId
    const Member = await member.findById(memberId);

    if (!Member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }
//console.log('memebr',Member)
    // Extract necessary details for sending email
    const { emailAddress, fullName } = Member;

console.log('email',emailAddress);
    if (!emailAddress) {
      return res.status(400).json({ success: false, message: 'Member does not have an email address' });
    }

    // Construct email options
    const mailOptions = {
      from: 'samafadah2001@gmail.com', // Sender's email address
      to: emailAddress,
      subject: 'New Task Assignment',
      text: `Hello ${fullName},

You have been assigned a new task. Below are the details:

Description: ${description}
Due Date: ${deadline}

Please make sure to complete it by the due date.

Best regards,
EmpowerHer`,
    };

    // Send email using transporter
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');

    const newNotification = new Notification({
      memberId,
      title: 'New Task Assigned',
      body: `You have a new task: ${description}`,
      timestamp: new Date().toISOString()
    });
    await newNotification.save();

    // Respond with success message and task details
    res.status(201).json({ success: true, message: 'Task created successfully and email sent', task: newTask });
  } catch (error) {
    console.error("Error creating task or sending email:", error);
    res.status(500).json({ success: false, message: "Failed to create task or send email" });
  }
});

app.get('/notifications', async (req, res) => {
  const { memberId } = req.query;

  try {
    let notifications;
    
    if (memberId) {
      // Fetch notifications specific to the memberId
      notifications = await Notification.find({ memberId }).sort({ timestamp: -1 });
    } else {
      // If memberId is not provided, fetch all notifications
      notifications = await Notification.find().sort({ timestamp: -1 });
    }
    
    res.json({ success: true, notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
  }
});


///post products/////////
app.post("/products", upload.array("images"), async (req, res) => {
  try {
    const productData = req.body;
    const images = req.files.map((file) => file.path);
    const newProduct = await Product.create({ ...productData, images });
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add product",
    });
  }
});

//get products///
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();

    if (!products) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
    const productsWithPictures = products.map((product) => {
      const { images, ...rest } = product.toObject();
      const pictureUrls = images.map(
        (picture) =>
          `${req.protocol}://${req.get("host")}/uploads/${path.basename(
            picture
          )}`
      );
      return { ...rest, images: pictureUrls };
    });

    return res
      .status(200)
      .json({ success: true, products: productsWithPictures });
  } catch (error) {
    console.error("Error fetching products :", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "No product found" });
    }

    const { images, ...rest } = product.toObject();
    const pictureUrls = images.map(
      (picture) =>
        `${req.protocol}://${req.get("host")}/uploads/${path.basename(
          picture
        )}`
    );

    return res
      .status(200)
      .json({ success: true, product: { ...rest, images: pictureUrls } });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/products/:title", async (req, res) => {
  try {
    const title = req.params.title;
    const filteredProducts = await Product.find({ category: title });

    if (filteredProducts.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }

    const productsWithPictures = filteredProducts.map((product) => {
      const { images, ...rest } = product.toObject();
      const pictureUrls = images.map(
        (picture) =>
          `${req.protocol}://${req.get("host")}/uploads/${path.basename(
            picture
          )}`
      );
      return { ...rest, images: pictureUrls };
    });

    return res
      .status(200)
      .json({ success: true, products: productsWithPictures });
  } catch (error) {
    console.error("Error fetching products :", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

////get tasks/////
app.get("/tasks/:id", async (req, res) => {
  try {
    const memberId = req.params.id;
    // Find all tasks associated with the given member ID
    const tasks = await Task.find({ memberId });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ success: false, message: "No tasks found for this member" });
    }

    // Return the tasks associated with the member ID
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


app.get('/members/:email', async (req, res) => {
  try {
    const { email } = req.params; // Extract email from request parameters

    const regex = new RegExp('^' + email + '$', 'i'); // 'i' flag for case-insensitivity
    const Member = await member.findOne({ $or: [{ email: { $regex: regex } }, { emailAddress: { $regex: regex } }] });
    

    if (!Member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.json({ memberId: Member._id });
  } catch (error) {
    console.error('Error fetching member ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/members/:id', async (req, res) => {
  const memberId = req.params.id;

  try {
    console.log('Fetching member with ID:', memberId); // Log before querying the database
    const Member = await member.findById(memberId);

    if (!Member) {
      console.log('Member not found for ID:', memberId); // Log if member is not found
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    console.log('Member found:', Member); // Log member details if found
    res.status(200).json({ success: true, Member });
  } catch (error) {
    console.error('Error fetching member by ID:', error); // Log any errors that occur
    res.status(500).json({ success: false, message: 'Internal server error' });
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
      return res.status(200).json({ success: true, user: { _id:user._id,firstName: user.firstName, lastName: user.lastName , email:user.email , mobile:user.mobile } });
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

app.get('/sales',verifyToken , async (req, res) => { 
  try {
    const sales = await ProductSale.find();

    return res.status(200).json({ success: true, sales });
  } catch (error) {
    console.error('Error fetching sales:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/orders',verifyToken , async (req, res) => { 
  try {
    const customers = await Customers.find();

    return res.status(200).json({ success: true, customers });
  } catch (error) {
    console.error('Error fetching orders:', error);
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

app.get('/users', verifyToken, async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ success: true, users }); // Ensure the key is `users`
  } catch (error) {
    console.error('Error fetching Users:', error);
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



app.put("/Internship/:internshipId", async (req, res) => {
  try {
    const { internshipId } = req.params;
    const { employeeId } = req.body;
    console.log(employeeId);

    // Check if the provided employeeId already exists in the internships collection
    const existingInternship = await internship.findOne({ employeeId });
    if (existingInternship && existingInternship._id.toString() !== internshipId) {
      // If the provided employeeId already exists and it's not the current internship, handle the error
      return res.status(400).json({ success: false, message: "Employee is already assigned to another internship" });
    }

    // Update the Internship document with the provided employeeId
    const updatedInternship = await internship.findByIdAndUpdate(
      internshipId,
      { $set: { employeeId } }, // Use $set to update the specific field
      { new: true }
    );

    // Return the updated Internship document
    res.status(200).json({ success: true, internship: updatedInternship });
  } catch (error) {
    console.error("Error assigning employee to internship:", error);
    res.status(500).json({ success: false, message: "Failed to assign employee to internship" });
  }
});

//update task progress

app.put("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const { progress } = req.body;

    // Update task progress
    const updatedTask = await Task.findByIdAndUpdate(taskId, { progress }, { new: true });

    // Update status field based on progress and deadline
    let status;
    if (progress === '100%') {
      status = 'completed';
    } else if (new Date(updatedTask.deadline) < new Date() && progress !== '100%') {
      status = 'unaccomplished';
    } else {
      status = 'in progresss'; // Optional: You can set a default status if needed
    }

    // Update status field in the database
    await Task.findByIdAndUpdate(taskId, { status });

    res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    console.error("Error updating task progress:", error);
    res.status(500).json({ success: false, message: "Failed to update task progress" });
  }
});


app.put('/products/:productId', async (req, res) => {
  const productId = req.params.productId;
  const { productName, description, price, category, quantity,images } = req.body;

  try {
    // Find the product by its ID
    const product = await Product.findById(productId);

    // If the product doesn't exist, return an error
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Update the product properties if they are provided in the request body
    if (productName !== undefined) {
      product.productName = productName;
    }
    if (description !== undefined) {
      product.description = description;
    }
    if (price !== undefined) {
      product.price = price;
    }
    if (category !== undefined) {
      product.category = category;
    }
    if (quantity !== undefined) {
      product.quantity = quantity;
    }
    if (images !== undefined) {
      product.images = images;
    }

    // Save the updated product
    await product.save();

    // Return a success response
    res.status(200).json({ success: true, message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: 'Failed to update product' });
  }
});

//update quantity/////
app.put("/purchase", async (req, res) => {
  const { userId, cartItems  } = req.body;

  try {
    // Loop through each item in the cart
    for (let item of cartItems) {
      // Find the product in the database by its ID
      const product = await Product.findById(item._id);

      // If the product exists and has enough quantity
      if (product && product.quantity >= item.quantity) {
        // Decrease the quantity of the product
        product.quantity -= item.quantity;

        // Save the updated product in the database
        await product.save();
      } else {
        // If the product doesn't exist or doesn't have enough quantity, return an error
        return res.status(400).json({ success: false, message: `Product ${item._id} is not available or quantity is insufficient` });
      }
    }
    res.status(200).json({ success: true, message: 'Purchase successful and quantities updated' });
  } catch (error) {
    console.error('Error processing purchase:', error);
    res.status(500).json({ success: false, message: 'Failed to process purchase' });
  }
});

///delete product////
app.delete('/product/:id', verifyToken, async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting Opportunity form:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
