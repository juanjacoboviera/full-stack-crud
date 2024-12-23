const Task = require('../models/task')
const Employee = require("../models/employee")
const { ObjectId } = require('mongodb');
exports.createTask = async (req, res, next) =>{
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration,
        task_completed: req.body.task_completed,
        tasked_user: req.body.tasked_user,
        task_creator: req.body.task_creator,
    });
    try {
        const response = await task.save()
        if(response){
            const taskedUser = await Employee.findById(req.body.tasked_user.id)
            taskedUser.tasks.push({_id: response._id})
            await taskedUser.save()

            res.status(201).json({
                message: "Task created successfully!",
                task: response
        })
    }
    } catch (error) {
        res.status(500).json({
            message: "There was an error!",
            errorMessage: error
    })
        console.log(error, "this is the error")
    }
}

exports.getTasks = async (req, res, next) =>{
    const _id = req.params.id
    const { taskType } = req.query;
    let response = undefined
    console.log(taskType)
    try {
        if(taskType == 'assigned'){
            response = await Task.find({ "tasked_user.id": _id })
        }else{
            response = await Task.find({ "task_creator.id": _id })
        }
        if(response){
            console.log(response)
            res.status(201).json({
                message: "Tasks retrieved successfully!",
                tasks: response
        })
        }
    } catch (error) {
        console.log(error, "this is the error")
    }
}

exports.editTask = async (req, res, next) =>{
    const _id = req.params.id
    const updatedTask = req.body
    console.log(updatedTask)
    try {
        const response = await Task.findByIdAndUpdate(_id, updatedTask)
        if(response){
            console.log(response)
            res.status(201).json({
                message: "Task updated successfully!",
                task: response
        })
        }
    } catch (error) {
        res.status(500).json({
            message: "There was an error!",
            errorMessage: error
    })
        console.log(error)
    }
}