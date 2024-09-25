const Employee = require("../models/employee")

exports.createUser = (req, res, next) =>{
    const employee = new Employee({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        job_dept: req.body.job_dept
    });
    employee
    .save()
    .then((result) =>{
        console.log(result)
        res.status(201).json({
            message: "Employee created successfully!",
            employee: result
        })
    })
    .catch((error)=> console.log(error))
    
}