import { Router } from "express"
import userRouter from "./userRouter"
import appointmentsRouter from "./appointmentsRouter"

const indexRouter = Router()

indexRouter.use("/user", userRouter)
indexRouter.use("/appointments", appointmentsRouter)



export default indexRouter