const Task = require('../models/task')
const { ObjectId } = require('mongodb');
exports.createTask = async (req, res, next) =>{
    
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration,
        date_completed: req.body.date_completed,
        userId: new ObjectId(req.body.userId),
    });

    try {
        const response = await task.save()
        if(response){
            res.status(201).json({
                message: "Task created successfully!",
                task: response
        })
    }
    } catch (error) {
        console.log(error)
    }

}