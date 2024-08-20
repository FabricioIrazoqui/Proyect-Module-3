import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"
import User from "./Users"

@Entity({
    name: "credentials"
})
export class Credentials {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({unique: true})
    username!: string

    @Column()
    password!: string

}

export default Credentials
