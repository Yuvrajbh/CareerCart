import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import Errorhandler from "../middlewares/error.js"
import Job from "../models/jobSchema.js"


export const getAllJobs = catchAsyncError(async (req, res, next) => {
    const jobs = await Job.find({ expired: false });
    res.status(200).json({
        success: true,
        jobs,
    })
})

export const postJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new Errorhandler("Job Seeker are not allowed to post jobs !", 400))
    }
    const { title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo } = req.body;
    if (!title || !description || !category || !country || !city || !location) {
        return next(new Errorhandler("Plase provide full job details !", 400))
    }
    if (!fixedSalary && (!salaryFrom && !salaryTo)) {
        return next(new Errorhandler("Plase provide  fixedSalary or  ranged salary !", 400))
    }
    if (fixedSalary && salaryFrom && salaryTo) {
        return next(new Errorhandler("Cant provide  fixedSalary and ranged salary !", 400))
    }
    const postedBy = req.user._id;
    const job = await Job.create({
        title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo, postedBy

    })
    res.status(200).json({
        success: true,
        job,
        message: "job posted successfully!",
    })
})

export const getmyJobs=catchAsyncError(async(req,res,next)=>{
    const {role}=req.user;
    if(role==="Job Seeker")
    {
        return next(new Errorhandler("Job Seeker are not allowed to post jobs !", 400))
    }
    const myjobs=await Job.find({postedBy:req.user._id})
    res.status(200).json({
        success: true,
        myjobs,
        message: "job retrieved successfully!",
    })

})


export const updateJob=catchAsyncError(async(req,res,next)=>{
    const {role}=req.user;
    if(role==="Job Seeker")
    {
        return next(new Errorhandler("Job Seeker are not allowed to post jobs !", 400))
    }
    const {id}=req.params;
    let job=await Job.findById(id);
    if(!job)
    {
        return next(new Errorhandler("Oops no job found !", 400))
    }
    job =await Job.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:true,
    })
    res.status(200).json({
        success: true,
        job,
        message: "job updated successfully!",
    })


})


export const deleteJob=catchAsyncError(async(req,res,next)=>{
    const {role}=req.user;
    if(role==="Job Seeker")
    {
        return next(new Errorhandler("Job Seeker are not allowed to post jobs !", 400))
    }
    const {id}=req.params;
    let job=await Job.findById(id)
    if(!job)
    {
        return next(new Errorhandler("Oops no job found !", 400))
    }
    await job.deleteOne();
    res.status(200).json({
        success: true,
        message: "job deleted successfully!",
    })
})