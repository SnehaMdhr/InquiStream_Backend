// adminModel.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js'; // Ensure this path is correct

const Admin = sequelize.define('Admin', {
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
});

// Export the Admin model as default
export default Admin; // Use default export