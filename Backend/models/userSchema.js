import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please Provide a name"],
        minLength:[3,"must contain 3 characters"],
        maxLength:[30,"must not more than contain 30 characters"]
    },
    email: {
        type: String,
        required: [true,"Please Provide a email"],
        validate:[validator.isEmail,"Please provide a email"],
    }, 
    phone: {
        type: Number,
        required: [true,"Please Provide a phone number"],
       
    },
    password: {
        type: String,
        required: [true,"Please Provide a password"],
        minLength:[5,"must contain 5 characters"],
        maxLength:[30,"must not more than contain 30 characters"]

    },
    role:{
        type: String,
        required: [true,"Please Provide a role"],
        enum:["Job Seeker", "Employer"],
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash the password before saving
userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

userSchema.methods.geJWTToken =  function() {
    try {
        const user = this;
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn:  process.env.JWT_EXPIRE });
        return token;
    } catch (error) {
        throw error;
    }
};

const User = mongoose.model('User', userSchema);

export default User; 
