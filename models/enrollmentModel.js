import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js'; // Ensure this is correctly imported

const Enrollments = sequelize.define('Enrollments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    inquiry_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    enrollment_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

export { Enrollments };
