import {catchAsyncError}  from "../middlewares/catchAsyncError.js"
import Errorhandler from "../middlewares/error.js"
import Job from "../models/jobSchema.js"


export const getAllJobs=catchAsyncError(async(req,res,next)=>{
    const jobs=await Job.find({expired:false});
    res.status(200).json({
        success:true,
        jobs,
    })
})