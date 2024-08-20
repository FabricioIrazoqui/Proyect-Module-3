import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { AppointmentDescription, AppointmentStatus } from "../interface/enum"
import User from "./Users"

@Entity({
    name: "appointments"
})
export class Appointments {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    date!: Date

    @Column()
    time!: string

    @Column()
    status!: AppointmentStatus

    @Column()
    description!: AppointmentDescription
    
    @Column()
    userId!: number

    @ManyToOne(() => User, (user) => user.appointments)
    user!: User
}
