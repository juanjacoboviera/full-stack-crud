const jwt = require('jsonwebtoken');
const Employee = require("../models/employee")

exports.verifyToken = async (req, res, next) => {
    try {
      const token = req.get('Authorization').split('=')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = Employee.findById({ _id: decoded._id });
      if (!user) {
        throw new Error("Unauthorized");
      }
      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  };
  