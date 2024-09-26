const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const employeeRoutes = require("./routes/employee")
const app = express()
const cors = require('cors');

app.use(cors())

  app.use(bodyParser.json());
  
  
  app.use((req, res, next)=>{
	  res.setHeader("Access-Control-Allow-Origin", "*");
	  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
	  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	  next();
  })

mongoose
	.connect("mongodb+srv://juanjacoboviera:giHkjxyLOjVJznvW@full-stack-crud-prod.tpdny.mongodb.net/?retryWrites=true&w=majority&appName=full-stack-crud-prod")
	.then(() => {
		app.listen(8080, () => {
			console.log("Server has started!")
		})
	})
	.catch((error) => {
		console.error("Database connection error:", error);
	  });


app.use("/employee", employeeRoutes)