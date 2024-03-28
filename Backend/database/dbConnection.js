import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "JOB_SEAKING_PLATFORM"
    }).then(() => {
        console.log("connected to database")
    }).catch((error)=>{
        console.error(`somme erorr occure due to ${error}`)
    })
}