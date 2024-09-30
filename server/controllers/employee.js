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

exports.getEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id);
        console.log(employee)
        res.status(200).send(employee); 
        console.log('Operation succeeded:', employee);
    } catch (error) {
        console.error('An error occurred:', error.message);

        res.status(500).send({ message: 'An error occurred while retrieving employee.' });

    }
};

exports.updateEmployee = async (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty!"
        });
    }
    
    const id = req.params.id;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {new: true}).then(data => {
        if (!updatedEmployee) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            res.send({ message: "User updated successfully.", userData: updatedEmployee })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};