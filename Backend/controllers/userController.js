import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import  ErrorHandler  from "../middlewares/error.js"
import User  from "../models/userSchema.js"



export const register = catchAsyncError(async (req, res, next) => {
    const { name, role, email, password, phone } = req.body;
    if (!name || !role || !email || !password || !phone) {
        return next(new ErrorHandler("Please fill the registartion form"))
    }

    const isemail = await User.findOne({ email });
    if (isemail)
    {
        return next(new ErrorHandler("Account already exists!"))
    } 

    const user = await User.create({
        name, email, phone, password, role
    });
    // res.status(200).json({
    //     success:true,
    //     message:"user registered successfully",
    //     user
    // })
    
})