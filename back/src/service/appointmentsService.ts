import { AppDataSource } from "../config/data-source"
import { Appointments } from "../entities/Appointments"
import User from "../entities/Users"
import { AppointmentStatus } from "../interface/enum"
import { AppointmentsRepository } from "../repositories/AppointmentsRepository"
import { UsersRepository } from "../repositories/UsersRepository"



export const getAllAppointmentsService = async () => {
    try {
        const appointments = await AppointmentsRepository.find({
            relations: ["user"] 
        })
        return appointments
    } catch (error) {
        throw Error('Error al buscar los turnos')
    }
}

export const getAppointmentByIdService = async (id: number) => {
    try {
        const appointment = await AppointmentsRepository.findOne({
            where: {id},
            relations: ["user"]
        })
        return appointment
    } catch (error) {
        throw Error('Error al buscar el turno')
    }
}

export const scheduleAppointmentsService = async (createSchedule: Appointments, userId: number) => {   
    
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        const user: User | null = await UsersRepository.findOneBy({id: userId})
        if(!user) throw new Error('Usuario Inexistente')
        const appointment = AppointmentsRepository.create({
            ...createSchedule,
            status: AppointmentStatus.ACTIVE,
            user: user
        });
        return await AppointmentsRepository.save(appointment);
    } catch (error) {
        throw Error('Error al crear el turno')
    } finally {
        await queryRunner.release();
    }
}

export const cancelAppointmentsService = async (id: number) => {
    try {
        const appointment = await AppointmentsRepository.findOneBy({ id });
        if (!appointment) {
            throw new Error('Turno inexistente');
        }

        appointment.status = AppointmentStatus.CANCELLED;
        const result = await AppointmentsRepository.save(appointment);

        return result;
    } catch (error) {
        throw new Error('Error al cancelar el turno');
    }
};