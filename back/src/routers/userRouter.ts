import { Router } from "express";
import { getAllUser, getUserById, register, updateUser, login } from "../controllers/userControllers";

const userRouter: Router = Router();

userRouter.get("/", getAllUser);
userRouter.get("/:id", getUserById);
userRouter.post("/register", register);
userRouter.put("/:id", updateUser);
userRouter.post("/login", login);

export default userRouter;
