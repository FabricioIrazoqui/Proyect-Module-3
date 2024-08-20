import { PrimaryGeneratedColumn, Column, Entity, OneToMany, OneToOne, JoinColumn } from "typeorm"
import { Appointments } from "./Appointments"
import { Credentials } from "./Credentials"

@Entity({
    name: "users"
})
class User {
    @PrimaryGeneratedColumn()
    id!: number | null

    @Column({ nullable: true, type: "varchar" })
    name!: string | null

    @Column({ nullable: true, unique: true, type: "varchar" })
    email!: string | null

    @Column({ nullable: true, type: "date" })
    birthdate!: string | null;


    @Column({ nullable: true, unique: true, type: "varchar" })
    nDni!: number | null

    @OneToMany(() => Appointments, appointment => appointment.user)
    appointments!: Appointments[]

    @OneToOne(() => Credentials, { cascade: true })
    @JoinColumn()
    credentials!: Credentials
}

export default User
