import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.js";
dotenv.config();

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
