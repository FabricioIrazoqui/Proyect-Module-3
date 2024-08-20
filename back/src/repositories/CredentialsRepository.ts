import { AppDataSource } from "../config/data-source";
import Credentials from "../entities/Credentials";


export const CredentialsRepository = AppDataSource.getRepository(Credentials)