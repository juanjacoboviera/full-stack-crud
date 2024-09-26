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
        job_dept: {
            name: { type: String, required: true },
            code: { type: String, required: true }
          }
    }
)

module.exports = mongoose.model("employee", employeeSchema)