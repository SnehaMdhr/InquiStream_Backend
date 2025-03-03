// authRoutes.js
import express from 'express';
import { login } from '../controller/authController.js'; // Adjust the import based on your project structure

const router = express.Router();

// Login route
router.post('/login', login);

export default router;