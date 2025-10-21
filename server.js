import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connecrDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import contactRoutes from "./routes/contactRoutes.js"


dotenv.config();
const app = express();
connectDB();


app.use(cors());
app.use(express.json());

app.get("/",(req,res) => res.send("Transport and logistics Backend"));
app.use("/api/auth,authRoutes");
app.use("/api/contact,contactRoutes");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Servrt running on port ${PORT}'));