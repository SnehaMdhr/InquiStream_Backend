// authController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel.js'; // Correct import for default export
import Staff from '../models/staffModel.js'; // Ensure this is also correct

// ✅ Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check in Admin table
    let user = await Admin.findOne({ where: { email } });
    let role = 'admin'; // Default role

    // If not found in Admin, check in Staff table
    if (!user) {
      user = await Staff.findOne({ where: { email } });
      role = 'staff'; // Change role to staff if found in Staff table
    }

    // If user is still not found, return an error
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the token and role in the response
    res.status(200).json({ message: "Login successful", token, role });
  } catch (error) {
    console.error("Error Logging In:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};