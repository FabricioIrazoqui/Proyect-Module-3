import { AppDataSource } from "../config/data-source";
import User from "../entities/Users";

export const UsersRepository = AppDataSource.getRepository(User).extend({
    async createUser(userData: Partial<User>) {
        const user = this.create(userData);
        return await this.save(user);
    },    
});