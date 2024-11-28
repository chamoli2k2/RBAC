import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

// Create express app
const app = express();

// Enable CORS
app.use(cors());
// Parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Using routes
import userRoutes from "./routes/user.routes.js";
app.use('/api/users', userRoutes);

// Using routes
import ownerRoutes from "./routes/owner.routes.js";
app.use('/api/owner', ownerRoutes);

// Using routes
import adminRoutes from "./routes/admin.routes.js";
app.use('/api/admin', adminRoutes);

// Using routes
import guestRoutes from "./routes/guest.routes.js";
app.use('/api/guest', guestRoutes);

export default app;