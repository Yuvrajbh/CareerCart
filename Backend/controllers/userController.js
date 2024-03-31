import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js"
import User from "../models/userSchema.js"
import { sendToken } from "../utils/jwtToken.js";



export const register = catchAsyncError(async (req, res, next) => {
    const { name, role, email, password, phone } = req.body;
    if (!name || !role || !email || !password || !phone) {
        return next(new ErrorHandler("Please fill the registartion form"))
    }

    const isemail = await User.findOne({ email });
    if (isemail) {
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
    sendToken(user, 200, res, "user registered successfully");
})

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !role || !password) {
        return next(new ErrorHandler("Please provide all detaisl", 400));
    }
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new ErrorHandler("Invalid credentials", 400));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid credentials", 400));
    }
    if (user.role !== role) {
        return next(new ErrorHandler("User with role not found", 400));
    }
    sendToken(user, 200, res, "user login successfully");

})

export const logout = catchAsyncError(async (req, res, next) => {
    res.status(201).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "User logged successfully"
    })
})

export const getuser=catchAsyncError(async (req, res, next) => {
    const user=req.user
    res.status(200).json({
        success:true,
        user
    })
})