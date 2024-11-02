import "dotenv/config";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import commentRouter from "./routes/commentRoute.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const allowedOrigins = [
  'https://food-delivery-admin-94kq.onrender.com',    // admin frontend
  'https://food-delivery-frontend-8gj3.onrender.com', // main frontend
  'http://localhost:5173',                            // local development
  'http://localhost:5174'                             // local development
];

// Configure CORS with specific options
app.use(cors({
  origin: function(origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


//DB CONNECTION
connectDB();

//Api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/comment", commentRouter);

app.get("/", (req, res) => {
  res.send("Api working");
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

//mongodb+srv://alikanbar:alikan20ali20@cluster0.qdyfh.mongodb.net/?
