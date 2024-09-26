const Employee = require("../models/employee")

exports.createEmployee = (req, res, next) =>{
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

exports.getEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find();
        console.log(employees)
        res.status(200).send(employees); 
        console.log('Operation succeeded:', employees);
    } catch (error) {
        console.error('An error occurred:', error.message);

        res.status(500).send({ message: 'An error occurred while retrieving employees.' });

    }
};