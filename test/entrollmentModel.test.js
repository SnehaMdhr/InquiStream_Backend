const { Sequelize, DataTypes } = require('sequelize');
const { expect } = require('jest');

const sequelize = new Sequelize('sqlite::memory:'); // In-memory database

const EnrollModel = sequelize.define('Enrollments', {
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    inquiry_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    enrollment_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'Enrollments',
    timestamps: true
});

beforeAll(async () => {
    await sequelize.sync(); // Sync the model with the database
});

afterAll(async () => {
    await sequelize.close(); // Close the database connection
});

describe('Enroll Model', () => {
    it('should create an enrollment', async () => {
        const enroll = await EnrollModel.create({
            student_id: 2,
            inquiry_id: 2,
            enrollment_date: "2025-04-03"
        });

        expect(enroll.student_id).toBe(2);
        expect(enroll.inquiry_id).toBe(2);
        expect(enroll.enrollment_date.toISOString().split('T')[0]).toBe("2025-04-03");
    });

    it('should require a student id and inquiry id', async () => {
        await expect(EnrollModel.create({})).rejects.toThrow();
    });
});