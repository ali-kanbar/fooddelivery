import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://foodDelivery:X6xAuPAlyIjenZAo@cluster0.zo93s.mongodb.net/food-delivery").then(()=>console.log("DB connection established"))
}
