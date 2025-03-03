import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel.js';
import Staff from '../models/staffModel.js';
import Inquiry from '../models/inquiryModel.js';


// ✅ Register Admin
export const registerAdmin = async (req, res) => {
  try {
    console.log("Received Request:", req.body); // Debugging log

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "Admin registered successfully", admin: newAdmin });

  } catch (error) {
    console.error("Error Registering Admin:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// ✅ Login Admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error Logging In:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
export const addStaff = async (req, res) => {
  const { email, name, phone, address, dob, gender, designation, employmentType, password, role } = req.body;

  try {
    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new staff member with the hashed password
    const newStaff = await Staff.create({
      email,
      name,
      phone,
      address,
      dob,
      gender,
      designation,
      employmentType,
      password: hashedPassword,  // Use the hashed password here
      role: role || "staff"  // Assign 'staff' if no role is provided
    });

    // Respond with a success message
    return res.status(201).json({ message: "Staff added successfully", staff: newStaff });
  } catch (error) {
    console.error("Error adding staff:", error);
    return res.status(500).json({ message: `Error adding staff: ${error.message}`, error });
  }
};


// ✅ Update Staff (Admin only)
export const updateStaff = async (req, res) => {
  const { staffId } = req.params; // Ensure staffId is in req.params
  const { name, email, phone, address, dob, gender, designation, employmentType } = req.body;

  try {
    const staff = await Staff.findByPk(staffId);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });

    staff.name = name || staff.name;
    staff.email = email || staff.email;
    staff.phone = phone || staff.phone;
    staff.address = address || staff.address;
    staff.dob = dob || staff.dob;
    staff.gender = gender || staff.gender;
    staff.designation = designation || staff.designation;
    staff.employmentType = employmentType || staff.employmentType;

    await staff.save();
    res.status(200).json({ message: 'Staff updated successfully', staff });
  } catch (error) {
    res.status(500).json({ message: 'Error updating staff', error });
  }
};

// ✅ Delete Staff (Admin only)
export const deleteStaff = async (req, res) => {
  const { staffId } = req.params;  // Ensure staffId is in req.params

  try {
    const staff = await Staff.findByPk(staffId);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });

    await staff.destroy();
    res.status(200).json({ message: 'Staff deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting staff', error });
  }
};

// ✅ Get All Staff (Admin only)
export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.findAll();
    res.status(200).json({ staff });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching staff', error });
  }
};

// ✅ Get Staff by ID (Admin only)
export const getStaffById = async (req, res) => {
  const { staffId } = req.params;

  try {
    const staff = await Staff.findByPk(staffId);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });

    res.status(200).json({ staff });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching staff', error });
  }
};

// ✅ Get All Inquiries (Admin only)
export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.findAll();
    res.status(200).json({ inquiries });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inquiries', error });
  }
};

// ✅ Update Inquiry (Admin only)
export const updateInquiry = async (req, res) => {
  const { inquiryId } = req.params;
  const { name, email, phone, message } = req.body;

  try {
    const inquiry = await Inquiry.findByPk(inquiryId);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });

    inquiry.name = name || inquiry.name;
    inquiry.email = email || inquiry.email;
    inquiry.phone = phone || inquiry.phone;
    inquiry.message = message || inquiry.message;

    await inquiry.save();
    res.status(200).json({ message: 'Inquiry updated successfully', inquiry });
  } catch (error) {
    res.status(500).json({ message: 'Error updating inquiry', error });
  }
};

// ✅ Delete Inquiry (Admin only)
export const deleteInquiry = async (req, res) => {
  const { inquiryId } = req.params;

  try {
    const inquiry = await Inquiry.findByPk(inquiryId);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });

    await inquiry.destroy();
    res.status(200).json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting inquiry', error });
  }
};

// ✅ Create Admin (To Add an Admin Manually)
export const createAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash('youradminpassword123', 10);
    const newAdmin = await Admin.create({
      name: 'Admin Name',
      email: 'admin@example.com',
      password: hashedPassword
    });

    console.log('Admin created:', newAdmin);
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};
