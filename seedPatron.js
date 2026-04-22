require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./Models/Users"); // adjust path if needed

// 🔑 Replace with your MongoDB connection string
const MONGO_URI = process.env.MONGO_URI;

const seedPatron = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    const email = "patron@club.com";

    // Check if patron already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Patron already exists");
      process.exit();
    }

    // Hash password
    const password = "admin123"; // change this later
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const patron = new User({
      name: "Club Patron",
      role: "patron",
      email,
      passwordHash
    });

    await patron.save();

    console.log("✅ Patron user created successfully");
    console.log("Email:", email);
    console.log("Password:", password);

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding patron:", error);
    process.exit(1);
  }
};

seedPatron();