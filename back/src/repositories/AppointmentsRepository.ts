import { AppDataSource } from "../config/data-source";
import { Appointments } from "../entities/Appointments";


export const AppointmentsRepository = AppDataSource.getRepository(Appointments).extend({
    async createAppointment(appointmentData: Partial<Appointments>) {
        const appointment = this.create(appointmentData);
        return await this.save(appointment);
    },
});