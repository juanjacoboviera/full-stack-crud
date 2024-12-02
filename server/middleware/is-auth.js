const jwt = require('jsonwebtoken');
const Employee = require("../models/employee")

exports.verifyToken = async (req, res, next) => {
    try {
      const token = req.get('Authorization').split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = Employee.findById({ _id: decoded._id });
      if (!user) {
        throw new Error("Unauthorized. Access denied");
      }
      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  };
  
  exports.verifyAdmin = async (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Employee.findById({ _id: decoded.userId });
 
    if (user.role.code === 'admin' || user.role.code === 'superAdmin') {
      next();
    } else {
      res.status(403).json({ message: 'Unauthorized Role. Access denied' });
    }
  }

  exports.verifySelfEditPermission = async (req, res, next) =>{
    const token = req.get('Authorization').split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userRequestingEdit = await Employee.findById({ _id: decoded.userId });

    const userToEditId  = req.body._id
    if(userRequestingEdit._id.toString() === userToEditId || userRequestingEdit.role.code === 'admin' || userRequestingEdit.role.code === 'superAdmin' ){
      next()
    }else{
      res.status(403).json({ message: 'Unauthorized Request. You can only edit your own user' });
    }
  }
