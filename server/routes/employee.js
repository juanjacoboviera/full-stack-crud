const express = require("express")
const router = express.Router()
const employeesController = require("../controllers/employee")

router.post("/employees", employeesController.createEmployee )

module.exports = router