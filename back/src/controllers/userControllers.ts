import { Request, Response } from "express"
import { getAllUserService, getUserByIdService, updateUserService, findUserCredentialById, createUserService } from "../service/userService"
import User from "../entities/Users"
import { validateCredential } from "../service/credentialsService"
import Credentials from "../entities/Credentials"

export const getAllUser = async (req: Request, res: Response) => {
    try {
        const users: User[] = await getAllUserService()
        res.status(200).json(users)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const getUserById = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    try {
        const { id } = req.params
        const userById = await getUserByIdService(Number(id))
        res.status(200).json(userById)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const register = async (req: Request, res: Response) => {
    console.log(req.body);
    
    try {
        const { credentials, userData } = req.body;
        console.log(credentials);
        console.log(userData);
        
        
        const { name, email, birthdate, nDni } = userData
        const { username, password} = credentials
        const newUser = await createUserService({username, password}, { name, email, birthdate, nDni });
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateUser = async (req: Request<{ id: string }, {}, Partial<User>>, res: Response) => {
    try {
        const { id } = req.params
        const updateUserDto = req.body
        const updatedUser = await updateUserService(Number(id), updateUserDto)
        res.status(200).json(updatedUser)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { credentials } = req.body;
        console.log(req.body);
        const { username, password } = credentials;
        console.log({ username, password });

        const credential = await validateCredential({ username, password });
        console.log(credential);

        if (!credential || !credential.id) {
            throw new Error("Credenciales incorrectas o ID indefinido");
        }

        const user = await findUserCredentialById(credential.id);
        res.status(200).json({ login: true, user });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

