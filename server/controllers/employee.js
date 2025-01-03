const Employee = require("../models/employee")
const bcrypt = require('bcrypt');
const {getPaginatedResult} = require("../helpers/helpers")

exports.registerUser = (req, res, next) =>{
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

    const employee = new Employee({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
        job_dept: req.body.job_dept,
        role: req.body.role
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

exports.createEmployee = (req, res, next) =>{
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

    const employee = new Employee({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
        job_dept: req.body.job_dept,
        role: req.body.role
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
    .catch((error)=> console.log("this is the error:", error))
    
}


exports.getEmployees = async (req, res, next) => {
    const { limit, offset } = req.query;
    const querySettings = {
        limit: limit,
        offset: offset,
        searchFor: {},
        model: Employee,
    }
    try {
        // const employees = await Employee.find();
        const employees = await getPaginatedResult(querySettings)
        console.log(employees)
        res.status(200).send({message: 'Operation succeeded:', data: employees}); 
    } catch (error) {
        console.error('An error occurred:', error.message);

        res.status(500).send({ message: 'An error occurred while retrieving employees.' });

    }
};

exports.getEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id);
        const {role, _id, first_name, last_name, email} = employee
        console.log(employee)
        res.status(200).send({role, _id, first_name, last_name, email}); 
        console.log('Operation succeeded:', employee);
    } catch (error) {
        console.error('An error occurred:', error.message);

        res.status(500).send({ message: 'An error occurred while retrieving employee.' });

    }
};

exports.updateEmployee = async (req, res) => {
    let userPassword = ""
    const _id = req.params.id
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty!"
        });
    }
    if(!req.body.password){
        const employee = await Employee.findById(_id);
        const {password} = employee
        userPassword = password
    }else{
        const saltRounds = 10;
        userPassword = bcrypt.hashSync(req.body.password, saltRounds);
    }
    const updatedData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: userPassword,
        job_dept: req.body.job_dept,
        role: req.body.role
    }
    const id = req.params.id;
    const updatedEmployee = Employee.findByIdAndUpdate(id, updatedData, {new: true}).then(data => {
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

exports.deleteEmployee = async (req, res, next) => {
       const employee = await Employee.findByIdAndDelete(req.params.id)
            try{
                res.status(204).send(); 
                console.log('Employee deleted:', employee);
            }catch (error) {
                res.status(204).send(); 
                console.error('An error occurred:', error.message);        
            };
};


