import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import connectDB from "./config/dbConnection.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
