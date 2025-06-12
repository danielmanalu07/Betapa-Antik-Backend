import dotenv from "dotenv";
import express from "express";
import router from "./interfaces/routes/routes";
import path from "path";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
