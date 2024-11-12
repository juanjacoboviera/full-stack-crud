const Employee = require("../models/employee")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt"); 


exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await Employee.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token (or another method of authentication)
    // const token = jwt.sign(
    //   { userId: user.id, email: user.email },
    //   process.env.JWT_SECRET, // Store secret in an .env file
    //   { expiresIn: "1h" } // Token expiration
    // );

    // Send token in response
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

