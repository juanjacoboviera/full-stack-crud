const express = require("express")
const router = express.Router()
const authController = require("../controllers/task")

router.post("/createTask", authController.createTask)

module.exports = router