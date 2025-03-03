import Inquiry from '../models/inquiryModel.js';  // Ensure this model is correct

// Get all inquiries (Admin & Staff)
export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.findAll();  // Sequelize method
    res.status(200).json({ inquiries });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inquiries', error });
  }
};

// Get a single inquiry by ID (Admin & Staff)
export const getInquiryById = async (req, res) => {
  const { inquiryId } = req.params;

  try {
    const inquiry = await Inquiry.findByPk(inquiryId);  // Sequelize method
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });

    res.status(200).json({ inquiry });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inquiry', error });
  }
};

// Create a new inquiry (Admin & Staff)
export const createInquiry = async (req, res) => {
  const {
    name, email, phone, age, permanentAddress, temporaryAddress,
    gender, maritalStatus, workExperience, interestedCountries,
    testsTaken, status = "pending"  // Default status set to "pending"
  } = req.body;

  try {
    const newInquiry = await Inquiry.create({
      name, email, phone, age, permanentAddress, temporaryAddress,
      gender, maritalStatus, workExperience, interestedCountries,
      testsTaken, status
    });

    res.status(201).json({ message: 'Inquiry created successfully', inquiry: newInquiry });
  } catch (error) {
    res.status(500).json({ message: 'Error creating inquiry', error });
  }
};

// Update an inquiry (Admin & Staff)
export const updateInquiry = async (req, res) => {
  const { inquiryId } = req.params;
  const updateData = req.body;  // Allows updating any field

  try {
    const inquiry = await Inquiry.findByPk(inquiryId);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });

    await inquiry.update(updateData);  // Updates all fields dynamically
    res.status(200).json({ message: 'Inquiry updated successfully', inquiry });
  } catch (error) {
    res.status(500).json({ message: 'Error updating inquiry', error });
  }
};

// Delete an inquiry (Admin only)
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

export const getEnrolledInquiries = async (req, res) => {
  try {
    const enrolledInquiries = await Inquiry.findAll({
      where: { status: 'enrolled' },
    });
    res.status(200).json({ enrolledInquiries });
  } catch (error) {
    console.error('Error fetching enrolled inquiries:', error);
    res.status(500).json({ message: 'Failed to fetch enrolled inquiries', error: error.message });
  }
};
