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

export const postJob=catchAsyncError(async(req,res,next)=>{
    const {role}=req.user;
    if(role==="Job Seeker")
    {
        return next(new Errorhandler("Job Seeker are not allowed to post jobs !",400))
    }
    const {title, description, category ,country , city ,location, fixedSalary, salaryFrom, salaryTo}=req.body;
    if(!title||!description|| !category ||!country || !city ||!location)
    {
        return next(new Errorhandler("Plase provide full job details !",400))
    }
    if(!fixedSalary&&(!salaryFrom&& !salaryTo ))
    {
        return next(new Errorhandler("Plase provide  fixedSalary or  ranged salary !",400))
    }
    if(fixedSalary&&salaryFrom&&salaryTo)
    {
        return next(new Errorhandler("Cant provide  fixedSalary and ranged salary !",400))
    }
    const  postedBy=req.user._id;
    const job=await Job.create({
        title, description,category, country  ,city ,location ,fixedSalary ,salaryFrom ,salaryTo ,postedBy

    })

    res.status(200).json({
        success:true,
        job,
        message:"job posted successfully!",
    })



})