const express = require("express")
const router = express.Router()
const authController = require("../controllers/task")
const isAuth = require("../middleware/is-auth")

router.post("/createTask", isAuth.verifyAdmin, authController.createTask)
router.get("/tasks/:id", authController.getTasks)
router.patch("/task/:id",  authController.editTask)


module.exports = router