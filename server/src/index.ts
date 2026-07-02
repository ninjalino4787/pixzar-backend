import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/database";
import path from "path";


// load vars — process.cwd() is always pixar-backend/ (where you run pnpm dev from)
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

// write start server

const startServer = async () => {
  try {

    console.log("[debug] MONGODB_URI loaded:", process.env.MONGODB_URI ?? "undefined — .env not loading!");
    await connectDB();
    console.log("connection successful, MONGODB_URI: ", process.env.MONGODB_URI);

    process.on("uncaughtException", (error) => {
      console.log("express app error: ", error);
      process.exit(1); //shuts my code down if error exists
    });

    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`serevr is running at port : ${process.env.PORT} || 9000`);
        
    })
  } catch (error) {
    console.error("mongodb connectuon failed so server wont start", error);
    
  }
};

startServer()
