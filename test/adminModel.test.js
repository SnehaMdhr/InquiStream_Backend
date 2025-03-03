// adminModel.test.js
const { DataTypes } = require('sequelize');
const SequelizeMock = require('sequelize-mock');

// Create a mock for Sequelize
const DBConnectionMock = new SequelizeMock();

// Define the Admin model directly in the test file
const Admin = DBConnectionMock.define('Admin', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 100],
    },
  },
});

// Mock the create method
Admin.$queueResult('create', Admin);

// Test suite for Admin model
describe('Admin Model', () => {
  it('should create a new admin', async () => {
    const adminData = {
      email: 'admin@example.com',
      password: 'password123',
    };

    const newAdmin = await Admin.create(adminData);

    expect(newAdmin.email).toBe(adminData.email);
    expect(newAdmin.password).toBe(adminData.password);
  });

  it('should throw an error if email is not provided', async () => {
    const adminData = {
      password: 'password123',
    };

    await expect(Admin.create(adminData)).rejects.toThrow();
  });

  it('should throw an error if password is not provided', async () => {
    const adminData = {
      email: 'admin@example.com',
    };

    await expect(Admin.create(adminData)).rejects.toThrow();
  });

  it('should throw an error if email is invalid', async () => {
    const adminData = {
      email: 'invalid-email',
      password: 'password123',
    };

    await expect(Admin.create(adminData)).rejects.toThrow();
  });
});