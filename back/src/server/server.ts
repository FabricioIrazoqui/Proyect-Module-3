import express from "express"
import morgan from "morgan"
import cors from "cors"
import indexRouter from "../routers/indexRouter"
import { requestLogger } from "../middleware/requestLoguer"
import { errorHandler } from "../middleware/errorHandler"
import { corsOptions } from "../middleware/corsOptions"

const app = express()


app.use(cors(corsOptions))
app.use(express.json())
app.use(requestLogger)
app.use(morgan("dev"))
app.use(indexRouter)
app.use(errorHandler)



export default app