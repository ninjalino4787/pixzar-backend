import mongoose from "mongoose";
const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`connection to MONOGODB successful ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("connection to MONGODB failed: " ,error);
        process.exit(1); 
        
    }
}

export default connectDB;