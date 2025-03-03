import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

const Staff = sequelize.define('Staff', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  dob: { type: DataTypes.DATEONLY, allowNull: false },
  gender: { type: DataTypes.STRING, allowNull: false },
  designation: { type: DataTypes.STRING, allowNull: false },
  employmentType: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: {
    type: DataTypes.STRING, 
    allowNull: false,
  }  
});

export default Staff;
