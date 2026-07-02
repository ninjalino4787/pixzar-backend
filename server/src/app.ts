import express, {Application} from "express"
import cors from "cors"
import userRouter from "./routes/user.routes"
import habitRouter from "./routes/habits.routes"
import checkInRouter from "./routes/checkIn.routes"
import getprofileRouter from "./routes/profile.routes"


const app: Application = express();

// ✅ Correct multi-origin setup
const allowedOrigins = [
  'http://localhost:3000',
  'https://pixzar-habt-tracker-d8of4l4ae-olosunde-david-olamipos-projects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


// import routers here later dave
app.use("/users",userRouter)
app.use("/habits",habitRouter)
app.use("/checkIn",checkInRouter)
app.use("/profile", getprofileRouter)

export default app;

// make id nessary and email maybe but in the route userid