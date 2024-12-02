const express = require("express")
const router = express.Router()
const employeesController = require("../controllers/employee")
const isAuth = require("../middleware/is-auth")

router.post("/registerUser", employeesController.registerUser)
router.post("/createEmployee", isAuth.verifyToken, isAuth.verifyAdmin, employeesController.createEmployee)
router.get("/employees", isAuth.verifyToken, employeesController.getEmployees)
router.get("/employee/:id", isAuth.verifyToken, employeesController.getEmployee)
router.patch("/employee/:id", isAuth.verifyToken, isAuth.verifySelfEditPermission, employeesController.updateEmployee)
router.delete("/employee/:id", isAuth.verifyToken, employeesController.deleteEmployee)


module.exports = router