import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";

const authMiddleware = async (req,res,next) => {
    const {token} = req.headers;
    if (!token) {
        return res.json({success:false, message:"Not authorized, Login Again"});
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findById(token_decode.id);
        req.body.userId = user._id;
        req.body.userName = user.name;
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"error"})
    }

}

export default authMiddleware