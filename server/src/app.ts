import express, {Application} from "express"
import cors from "cors"
import userRouter from "./routes/user.routes"
import habitRouter from "./routes/habits.routes"
import checkInRouter from "./routes/checkIn.routes"
import getprofileRouter from "./routes/profile.routes"


const app: Application = express();

app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials:true
}))

// import routers here later dave
app.use("/users",userRouter)
app.use("/habits",habitRouter)
app.use("/checkIn",checkInRouter)
app.use("/profile", getprofileRouter)

export default app;

// make id nessary and email maybe but in the route userid