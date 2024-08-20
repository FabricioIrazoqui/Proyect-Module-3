import { Router } from "express"
import { getAllAppointments, getAppointmentsById, postCancel, postSchedule } from "../controllers/appointmentsControllers"

const appointmentsRouter: Router = Router()

appointmentsRouter.get("/", getAllAppointments)
appointmentsRouter.get("/:id", getAppointmentsById)
appointmentsRouter.post("/schedule", postSchedule)
appointmentsRouter.put("/cancel/:id", postCancel)



export default appointmentsRouter