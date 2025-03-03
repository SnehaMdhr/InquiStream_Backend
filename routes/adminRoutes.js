import express from 'express';
import {
  registerAdmin,
  loginAdmin,
  addStaff,
  updateStaff,
  deleteStaff,
  getAllStaff,
  getStaffById,
  getAllInquiries,
  updateInquiry,
  deleteInquiry
} from '../controller/AdminController.js';

const router = express.Router();

// Admin Routes
router.post('/register', registerAdmin);  // Register Admin
router.post('/login', loginAdmin);  // Login Admin

// Staff management (Admin only)
router.post('/staff', addStaff);  // Add Staff
router.put('/staff/:staffId', updateStaff);  // Update Staff
router.delete('/staff/:staffId', deleteStaff);  // Delete Staff
router.get('/staff', getAllStaff);  // Get All Staff
router.get('/staff/:staffId', getStaffById);  // Get Staff by ID

// Inquiry management (Admin only)
router.get('/inquiries', getAllInquiries);  // Get All Inquiries (Admin)
router.put('/inquiry/:inquiryId', updateInquiry);  // Update Inquiry (Admin)
router.delete('/inquiry/:inquiryId', deleteInquiry);  // Delete Inquiry (Admin)

export default router;
