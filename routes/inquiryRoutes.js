import express from 'express';
import {
  getAllInquiries,
  getInquiryById,
  createInquiry,
  updateInquiry,
  deleteInquiry,
  getEnrolledInquiries  // ✅ Correct function name
} from '../controller/InquiryController.js'; // Ensure this path is correct
import { verifyToken } from '../middleware/authMiddleware.js';  // Authentication middleware

const router = express.Router();

// Admin and Staff can view all inquiries
router.get('/', verifyToken, getAllInquiries);  

// Admin and Staff can view a specific inquiry by ID
router.get('/:inquiryId', verifyToken, getInquiryById);  

// Admin and Staff can create a new inquiry
router.post('/', verifyToken, createInquiry);  

// Admin and Staff can update an existing inquiry
router.put('/:inquiryId', verifyToken, updateInquiry);  

// Admin only can delete an inquiry
router.delete('/:inquiryId', verifyToken, deleteInquiry);  

// Get all enrolled students (Admin & Staff)
router.get("/enrolled", verifyToken, getEnrolledInquiries);  // ✅ Correct function name


export default router;
