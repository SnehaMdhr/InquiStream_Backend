// routes/remarksRoutes.js
import express from 'express';
import pool from '../database/db.js';

const router = express.Router();

// POST route to add a remark
router.post('/add/:inquiryId', async (req, res) => {
    const { inquiryId } = req.params; // Get the inquiryId from the route
    const { remark } = req.body; // Get the remark from the body

    try {
        // Insert remark into the database
        const newRemark = await pool.query(
            'INSERT INTO "Remarks" (inquiry_id, remark) VALUES ($1, $2) RETURNING *',
            [inquiryId, remark]
        );
        res.status(201).json({ message: 'Remark added successfully', remark: newRemark.rows[0] });
    } catch (error) {
        console.error('Error adding remark:', error);
        res.status(500).json({ message: 'Failed to add remark', error: error.message });
    }
});

// Get remarks for a specific inquiry
router.get('/view/:inquiryId', async (req, res) => {
    const { inquiryId } = req.params;

    try {
        const remarks = await pool.query(
            'SELECT * FROM "Remarks" WHERE inquiry_id = $1 ORDER BY created_at DESC',
            [inquiryId]
        );
        res.status(200).json({ remarks: remarks.rows });
    } catch (error) {
        console.error('Error fetching remarks:', error);
        res.status(500).json({ message: 'Failed to fetch remarks', error: error.message });
    }
});

export default router;
