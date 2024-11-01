import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://foodDelivery:X6xAuPAlyIjenZAo@cluster0.zo93s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>console.log("DB connection established"))
}
