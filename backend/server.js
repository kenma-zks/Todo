import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import connectDB from "./config/dbConnection.js";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 5000 || 10000;

app.use(express.json());
app.use(cors());
const allowedOrigins = ["https://todo-kenma.netlify.app"];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
