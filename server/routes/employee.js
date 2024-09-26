const express = require("express")
const router = express.Router()
const employeesController = require("../controllers/employee")

router.post("/employee", employeesController.createEmployee )

module.exports = router