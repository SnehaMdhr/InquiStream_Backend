import express from "express";
import pool from "../database/db.js";

const router = express.Router();

// Route to get all enrolled students
// Route to get all enrolled inquiries
router.get("/enrolled", async (req, res) => {
    try {
        const enrolledInquiries = await pool.query(
            'SELECT * FROM "Inquiries" WHERE status = $1',
            ["enrolled"]
        );

        res.status(200).json(enrolledInquiries.rows);
    } catch (error) {
        console.error("Error fetching enrolled inquiries:", error);
        res.status(500).json({ message: "Failed to fetch enrolled inquiries", error: error.message });
    }
});


// Route to enroll a student (POST)
// Route to update the inquiry status to "enrolled"
router.post("/enroll/:inquiryId", async (req, res) => {
    const { inquiryId } = req.params;

    try {
        // Check if the student is already enrolled
        const existingEnrollment = await pool.query(
            'SELECT * FROM "Inquiries" WHERE id = $1 AND status = $2',
            [inquiryId, "enrolled"]
        );

        if (existingEnrollment.rowCount > 0) {
            return res.status(409).json({ message: "Student is already enrolled" });  // Return 409 if already enrolled
        }

        // Update the inquiry's status to 'enrolled'
        const updatedInquiry = await pool.query(
            'UPDATE "Inquiries" SET status = $1 WHERE id = $2 RETURNING *',
            ["enrolled", inquiryId]
        );

        if (updatedInquiry.rowCount === 0) {
            return res.status(404).json({ message: "Inquiry not found" });
        }

        res.status(200).json({ message: "Student successfully enrolled", inquiry: updatedInquiry.rows[0] });
    } catch (error) {
        console.error("Error enrolling student:", error);
        res.status(500).json({ message: "Failed to enroll student", error: error.message });
    }
});


export default router;
