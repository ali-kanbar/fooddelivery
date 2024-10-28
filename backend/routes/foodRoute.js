import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";

const foodRouter = express.Router()

//Image Storage Engine

foodRouter.post("/add",addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood)

export default foodRouter
