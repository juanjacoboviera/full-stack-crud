const express = require("express")
const router = express.Router()
const authController = require("../controllers/task")

router.post("/createTask", authController.createTask)
router.get("/getTasks", authController.getTasks)

module.exports = router