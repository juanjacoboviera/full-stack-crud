const express = require("express")
const mongoose = require("mongoose")
const bodyParser = reuire("body-parser")
const employeeRoutes = require("./routes/employee")
const app = express()

mongoose
	.connect("mongodb+srv://juanjacoboviera:giHkjxyLOjVJznvW@full-stack-crud-prod.tpdny.mongodb.net/?retryWrites=true&w=majority&appName=full-stack-crud-prod")
	.then(() => {
		const app = express()

		app.listen(5000, () => {
			console.log("Server has started!")
		})
	})

app.use(bodyParser.json());

app.use((req, res, next)=>{
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
})

app.use("/employees", employeeRoutes)