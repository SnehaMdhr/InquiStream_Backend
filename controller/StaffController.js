import Inquiry from '../models/inquiryModel.js';  // Import Inquiry separately

// Get the staff profile (view staff details)
export const getStaffProfile = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.user.id);  // Fetch staff from DB using the ID from the JWT token
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    res.status(200).json({ staff });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching staff profile', error });
  }
};

// Update the staff profile
export const updateStaffProfile = async (req, res) => {
  try {
    const { name, email, phone, address, dob, gender } = req.body;
    const staff = await Staff.findByPk(req.user.id);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });

    staff.name = name || staff.name;
    staff.email = email || staff.email;
    staff.phone = phone || staff.phone;
    staff.address = address || staff.address;
    staff.dob = dob || staff.dob;
    staff.gender = gender || staff.gender;

    await staff.save();
    res.status(200).json({ message: 'Profile updated successfully', staff });
  } catch (error) {
    res.status(500).json({ message: 'Error updating staff profile', error });
  }
};

// Get all inquiries assigned to the staff
export const getInquiriesForStaff = async (req, res) => {
  try {
    const inquiries = await Inquiry.findAll({ where: { staffId: req.user.id } });  // Assuming staffId is a foreign key in the inquiries table
    res.status(200).json({ inquiries });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inquiries', error });
  }
};

// Create a new inquiry (if allowed by your requirements)
export const createInquiryForStaff = async (req, res) => {
  try {
    const { subject, description } = req.body;
    const newInquiry = await Inquiry.create({
      subject,
      description,
      staffId: req.user.id,  // Associate this inquiry with the staff who created it
    });
    res.status(201).json({ message: 'Inquiry created successfully', inquiry: newInquiry });
  } catch (error) {
    res.status(500).json({ message: 'Error creating inquiry', error });
  }
};

// Update an inquiry
export const updateInquiryForStaff = async (req, res) => {
  const { inquiryId } = req.params;
  try {
    const inquiry = await Inquiry.findByPk(inquiryId);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });

    if (inquiry.staffId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this inquiry' });
    }

    const { status, description } = req.body;
    inquiry.status = status || inquiry.status;
    inquiry.description = description || inquiry.description;

    await inquiry.save();
    res.status(200).json({ message: 'Inquiry updated successfully', inquiry });
  } catch (error) {
    res.status(500).json({ message: 'Error updating inquiry', error });
  }
};

// Delete an inquiry
export const deleteInquiryForStaff = async (req, res) => {
  const { inquiryId } = req.params;
  try {
    const inquiry = await Inquiry.findByPk(inquiryId);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });

    if (inquiry.staffId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this inquiry' });
    }

    await inquiry.destroy();
    res.status(200).json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting inquiry', error });
  }
};
