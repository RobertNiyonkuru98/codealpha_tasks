const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/users');
require('dotenv').config();

async function seedAdmin() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to Database for seeding...");

        const adminEmail = 'admin@event.com';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log("Admin already exists!");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash('admin123', 10);
        
        await User.create({
            name: 'System Admin',
            email: adminEmail,
            password: hashedPassword,
            mobile_number: 1234567890,
            gender: 'Other',
            userId: 999,
            role: 'admin'
        });

        console.log("Admin user created successfully!");
        console.log("Email: admin@event.com");
        console.log("Password: admin123");
        
        process.exit();
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
}

seedAdmin();
