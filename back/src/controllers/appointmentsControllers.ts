import { Request, Response} from "express"
import { getAllAppointmentsService, getAppointmentByIdService, scheduleAppointmentsService, cancelAppointmentsService } from "../service/appointmentsService"
import { AppointmentsRepository } from "../repositories/AppointmentsRepository";
import { UsersRepository } from "../repositories/UsersRepository";

export const getAllAppointments = async (req: Request, res: Response) => {
    try {
        const appointments = await getAllAppointmentsService();
        res.status(200).json(appointments);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export const getAppointmentsById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const appointment = await getAppointmentByIdService(Number(id));
        if (!appointment) {
            res.status(404).json({ message: 'Turno no encontrado' });
            return;
        }
        res.status(200).json(appointment);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export const postSchedule = async (req: Request, res: Response) => {
    try {
        const {userId, ...appointmentData} = req.body
        const appointment = await scheduleAppointmentsService(appointmentData, Number(userId));
        res.status(201).json(appointment);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export const postCancel = async (req: Request, res: Response) => {
    try {
        const { appointmentId, userId } = req.body;

        const user = await UsersRepository.findOneBy({ id: userId });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const appointment = await AppointmentsRepository.findOneBy({ id: appointmentId });
        if (!appointment) {
            return res.status(404).json({ message: 'Turno no encontrado' });
        }
        
        await cancelAppointmentsService(appointmentId);
        res.status(200).json({ message: 'Turno cancelado exitosamente' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};