import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';  // Correct import
import { getStaffProfile, updateStaffProfile, getInquiriesForStaff, createInquiryForStaff, updateInquiryForStaff, deleteInquiryForStaff } from '../controller/staffController.js';

const router = express.Router();

// Apply JWT token verification middleware to all staff routes
router.use(verifyToken);

// Get the staff profile
router.get('/profile', getStaffProfile);

// Update the staff profile
router.put('/profile', updateStaffProfile);

// Get all inquiries assigned to the staff
router.get('/inquiries', getInquiriesForStaff);

// Create a new inquiry (if allowed by your requirements)
router.post('/inquiries', createInquiryForStaff);

// Update an inquiry
router.put('/inquiries/:inquiryId', updateInquiryForStaff);

// Delete an inquiry
router.delete('/inquiries/:inquiryId', deleteInquiryForStaff);

export default router;
