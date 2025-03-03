// staffModel.test.js
import SequelizeMock from 'sequelize-mock';

const sequelizeMock = new SequelizeMock();
const StaffMock = sequelizeMock.define('Staff', {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    address: '123 Main St',
    dob: '1990-01-01',
    gender: 'Male',
    designation: 'Developer',
    employmentType: 'Full-time',
    password: 'securepassword',
    role: 'staff',
}, {
    // Customizing the create method to simulate validation
    hooks: {
        beforeCreate: (staff) => {
            if (!staff.name) {
                throw new Error('Name is required');
            }
            if (!staff.email) {
                throw new Error('Email is required');
            }
            if (!staff.phone) {
                throw new Error('Phone is required');
            }
            if (!staff.address) {
                throw new Error('Address is required');
            }
            if (!staff.dob) {
                throw new Error('Date of Birth is required');
            }
            if (!staff.gender) {
                throw new Error('Gender is required');
            }
            if (!staff.designation) {
                throw new Error('Designation is required');
            }
            if (!staff.employmentType) {
                throw new Error('Employment Type is required');
            }
            if (!staff.password) {
                throw new Error('Password is required');
            }
            if (!staff.role) {
                throw new Error('Role is required');
            }
        }
    }
});

// Test suite for Staff model
describe('Staff Model', () => {
    it('should create a staff member with valid details', async () => {
        const staff = await StaffMock.create({
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            phone: '0987654321',
            address: '456 Elm St',
            dob: '1992-02-02',
            gender: 'Female',
            designation: 'Manager',
            employmentType: 'Part-time',
            password: 'anothersecurepassword',
            role: 'staff',
        });

        expect(staff.name).toBe('Jane Doe');
        expect(staff.email).toBe('jane.doe@example.com');
        expect(staff.phone).toBe('0987654321');
    });

    it('should require a name', async () => {
        await expect(StaffMock.create({ email: 'test@example.com' })).rejects.toThrow('Name is required');
    });

    it('should require an email', async () => {
        await expect(StaffMock.create({ name: 'Test User' })).rejects.toThrow('Email is required');
    });

    it('should require a phone', async () => {
        await expect(StaffMock.create({ name: 'Test User', email: 'test@example.com' })).rejects.toThrow('Phone is required');
    });

    it('should require an address', async () => {
        await expect(StaffMock.create({ name: 'Test User', email: 'test@example.com', phone: '1234567890' })).rejects.toThrow('Address is required');
    });

    it('should require a date of birth', async () => {
        await expect(StaffMock.create({ name: 'Test User', email: 'test@example.com', phone: '1234567890', address: '123 Main St' })).rejects.toThrow('Date of Birth is required');
    });

    it('should require a gender', async () => {
        await expect(StaffMock.create({ name: 'Test User', email: 'test@example.com', phone: '1234567890', address: '123 Main St', dob: '1990-01-01' })).rejects.toThrow('Gender is required');
    });

    it('should require a designation', async () => {
        await expect(StaffMock.create({ name: 'Test User', email: 'test@example.com', phone: '1234567890', address: '123 Main St', dob: '1990-01-01', gender: 'Male' })).rejects.toThrow('Designation is required');
 });

    it('should require an employment type', async () => {
        await expect(StaffMock.create({ name: 'Test User', email: 'test@example.com', phone: '1234567890', address: '123 Main St', dob: '1990-01-01', gender: 'Male', designation: 'Developer' })).rejects.toThrow('Employment Type is required');
    });

    it('should require a password', async () => {
        await expect(StaffMock.create({ name: 'Test User', email: 'test@example.com', phone: '1234567890', address: '123 Main St', dob: '1990-01-01', gender: 'Male', designation: 'Developer', employmentType: 'Full-time' })).rejects.toThrow('Password is required');
    });

    it('should require a role', async () => {
        await expect(StaffMock.create({ name: 'Test User', email: 'test@example.com', phone: '1234567890', address: '123 Main St', dob: '1990-01-01', gender: 'Male', designation: 'Developer', employmentType: 'Full-time', password: 'securepassword' })).rejects.toThrow('Role is required');
    });
});