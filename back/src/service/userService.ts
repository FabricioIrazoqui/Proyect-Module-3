import User from "../entities/Users"
import { UsersRepository } from "../repositories/UsersRepository"
import { CredentialsRepository } from "../repositories/CredentialsRepository"
import { AppDataSource } from "../config/data-source"
import Credentials from "../entities/Credentials"

export const getAllUserService = async () => {
    try {
        const users = await UsersRepository.find({
            relations: ["appointments"]
        })
        return users
    } catch (error) {
        throw Error('Error al buscar los usuarios')
    }
}

export const createUserService = async (
    credentials: {username: string, password: string}, 
    userData: { name: string, email: string, birthdate: string, nDni: number }
    ) => {
        
        const queryRunner = AppDataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const credentialEntity = CredentialsRepository.create(credentials);
            const savedCredentials = await queryRunner.manager.save(Credentials, credentialEntity);
            const user = UsersRepository.create({
                ...userData,
                credentials: savedCredentials,
            });
            const newUser = await queryRunner.manager.save(User, user);

            await queryRunner.commitTransaction();
            return newUser;
        } catch (error: any) {
            await queryRunner.rollbackTransaction();
            throw new Error(`Error al crear las credenciales: ${error.message}`);
        } finally {
            await queryRunner.release();
        }
    };

export const updateUserService = async (id: number, updateUserDto: Partial<User>) => {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const user = await UsersRepository.findOneBy({ id });
        if (!user) throw new Error('Usuario no encontrado');

        Object.assign(user, updateUserDto);
        const result = await queryRunner.manager.save(user);

        await queryRunner.commitTransaction();
        return result;
    } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new Error('Error al actualizar el usuario');
    } finally {
        await queryRunner.release();
    }
};

export const getUserByIdService = async (id: number) => {
    try {
        const result = await UsersRepository.findOne({
            where: { id },
            relations: ["appointments"]
        });
        return result;
    } catch (error) {
        throw Error('Error al buscar el usuario');
    }
};

export const findUserCredentialById = async (credentialId: number) => {
    try {
        const user = await UsersRepository.findOne({
            where: { credentials: { id: credentialId } },
            relations: ["credentials"]
        });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user;
    } catch (error) {
        throw new Error('Error al buscar el usuario por ID de credencial');
    }
};
