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
        duration: {
            type: Number,
            required: true
        },
        date_completed: {
            type: Date,
            required: false
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'employee', 
            required: true
          }
    }
)

module.exports = mongoose.model("task", taskSchema)