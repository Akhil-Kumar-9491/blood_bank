import express from "express";
import cors from "cors";
import donorRoutes from "./routes/donorRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/donor", donorRoutes);

export default app;
