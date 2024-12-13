const mongoose = require("mongoose")
const Schema = mongoose.Schema

const employeeSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        job_dept: {
            name: { type: String, required: false },
            code: { type: String, required: false }
          },
        role:{
            name: { type: String, required: true },
            code: { type: String, required: true }
        },
        tasks:[
            {_id: { type: Schema.Types.ObjectId, ref: 'employee', required: true }}
        ]
    }
)

module.exports = mongoose.model("employee", employeeSchema)