import { sequelize } from '../database/database.js';
import { DataTypes } from 'sequelize';
const Inquiry = sequelize.define('Inquiry', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: true },
  age: { type: DataTypes.INTEGER, allowNull: false },
  permanentAddress: { type: DataTypes.STRING, allowNull: false },
  temporaryAddress: { type: DataTypes.STRING, allowNull: false },
  gender: { type: DataTypes.STRING, allowNull: false },
  maritalStatus: { type: DataTypes.STRING, allowNull: false },
  workExperience: { type: DataTypes.JSON, allowNull: true },
  interestedCountries: { type: DataTypes.JSON, allowNull: true },
  testsTaken: { type: DataTypes.JSON, allowNull: true },
  status: { type: DataTypes.STRING, defaultValue: 'Inquiry' }
}, {
  tableName: 'Inquiries',  // 👈 Ensure table name is lowercase
  timestamps: true        // Disable createdAt & updatedAt if not needed
});

export default Inquiry;
