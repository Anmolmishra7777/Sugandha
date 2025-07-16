const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
// Signup Controller
const signup = async (req, res) => {
  try {
    // getting data from request body
    const { name, email, password } = req.body;
    // checking if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "email already used" });
    }
    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //creating a new user through data given by the user in body
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    // creating auth token
    const payload = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(payload, process.env.JWT_SECRET);
    res
      .status(201)
      .json({ message: "user created successfully", user, authToken });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { signup };
