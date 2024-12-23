const express = require("express")
const router = express.Router()
const authController = require("../controllers/task")

router.post("/createTask", authController.createTask)
router.get("/tasks/:id", authController.getTasks)
router.patch("/task/:id",  authController.editTask)


module.exports = router