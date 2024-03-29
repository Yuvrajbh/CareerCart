import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        minLength: [3, "Title must contain at least 3 characters"],
        maxLength: [40, "Title must not contain more than 40 characters"]
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
        minLength: [3, "Description must contain at least 3 characters"],
        maxLength: [240, "Description must not contain more than 240 characters"]
    },
    category: {
        type: String,
        required: [true, "Please provide a job category"]
    },
    country: {
        type: String,
        required: [true, "Please provide a job country"]
    },
    city: {
        type: String,
        required: [true, "Please provide a job city"]
    },
    location: {
        type: String,
        required: [true, "Please provide a job location"],
        minLength: [3, "Location must contain at least 3 characters"]
    },
    fixedSalary: {
        type: Number,
        min: [0, "Fixed salary cannot be negative"],
        max: [999999999, "Fixed salary must be less than 1 billion"]
    },
    salaryFrom: {
        type: Number,
        min: [0, "Salary from cannot be negative"],
        max: [999999999, "Salary from must be less than 1 billion"]
    },
    salaryTo: {
        type: Number,
        min: [0, "Salary to cannot be negative"],
        max: [999999999, "Salary to must be less than 1 billion"]
    },
    expired: {
        type: Boolean,
        default: false
    },
    jobPostedOn: {
        type: Date,
        default: Date.now
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
});


const Job = mongoose.model('Job', jobSchema);

export default Job; 
