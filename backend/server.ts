import app from "./app.js";
import dotenv from "dotenv";
import { testDB } from "./config/db.js";
import cors from "cors";

app.use(cors({
  origin: "*"
}));

dotenv.config();
app.use(cors({
  origin: "*"
}));

const PORT = process.env.PORT || 5000;

testDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

