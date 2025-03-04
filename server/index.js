import cookieParser from "cookie-parser"; // Middleware to parse cookies
import cors from 'cors'; // Middleware to enable Cross-Origin Resource Sharing
import dotenv from 'dotenv'; // Module to load environment variables from a .env file
import express from 'express'; // Web framework for Node.js
import morgan from 'morgan'; // HTTP request logger middleware
import dbConnection from './utils/index.js'; // Function to establish database connection
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewares.js";
import routes from "./routes/index.js";

// Load environment variables from .env file
dotenv.config();

// Establish database connection
dbConnection();

const PORT = process.env.PORT || 5000; // Define the port to run the server

const routes = ""; // Placeholder for routes

const app = express(); // Create an instance of Express

// Enable CORS for specified origins and methods
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
}));

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({extended:true})); // Middleware to parse URL-encoded bodies

app.use(cookieParser()); // Middleware to parse cookies
app.use(morgan("dev")); // Middleware to log HTTP requests

app.use("/api", routes)
app.use(routeNotFound);
app.use(errorHandler);

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server Running on Port: ${PORT}`);
});