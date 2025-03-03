import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

// Function to test and connect to the database
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // Ensure tables are up-to-date
    console.log('Database connected successfully...');
  } catch (e) {
    console.error('Failed to connect to the database:', e);
  }
};

export { sequelize, connectDB };
