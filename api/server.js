import connectDB from "./config/db.js";
import app from "./app.js";
import dotenv from "dotenv";


// Load env variables
dotenv.config();

// Connecting the DB
await connectDB();

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});