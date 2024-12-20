const mongoose = require("mongoose")
const Schema = mongoose.Schema

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        hours_taken: {
            type: Number,
            required: false
        },
        task_completed: {
            type: Boolean,
            required: true
        },
        tasked_user: {
            name: { type: String, required: true },
            id: { type: Schema.Types.ObjectId, ref: 'employee', required: true }
    
        },
        task_creator: {
        name: { type: String, required: true },
        id: { type: Schema.Types.ObjectId, ref: 'employee', required: true }
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("task", taskSchema)