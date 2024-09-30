const express = require("express")
const router = express.Router()
const employeesController = require("../controllers/employee")


router.post("/createEmployee", employeesController.createEmployee)
router.get("/employees", employeesController.getEmployees)
router.get("/employee/:id", employeesController.getEmployee)
router.patch("/employee/:id", employeesController.updateEmployee)
router.delete("/employee/:id", employeesController.deleteEmployee)

module.exports = router