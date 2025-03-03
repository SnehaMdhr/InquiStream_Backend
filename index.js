import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './database/database.js';  
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import staffRoutes from './routes/staffRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import enrollRoutes from './routes/enrolledRoutes.js'; // ✅ Correct import
import remarksRoutes from './routes/remarksRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register Routes
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use("/enrolled", enrollRoutes); // ✅ Correct variable name
app.use("/api/remarks", remarksRoutes);


// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the Inquiry Management System API!');
});

// Start the Server
const startServer = async () => {
  try {
    await connectDB();  // Connect to the database
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
};

startServer();
