import { useState } from "react";
import axios from "axios";
import styles from "../Styles/Appointments.module.css";

const Turns = ({ appointment, onUpdate, userId }) => {
    const { id, description, date, time, status } = appointment;
    const [showConfirm, setShowConfirm] = useState(false);

    const handleConfirmCancel = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/appointments/cancel/${id}`, { appointmentId: id, userId: userId });
            alert('Turno cancelado exitosamente')
            onUpdate(response.data)
            setShowConfirm(false);
        } catch (error) {
           alert('Error al cancelar el turno')
        }
    };

    return (
        <>
        <div className={styles.turn}>
            <div>
                <span>Servicio:</span>
                <span>{description}</span>
            </div>
            <div>
                <span>Hora:</span>
                <span>{time}</span>
            </div>
            <div>
                <span>Fecha:</span>
                <span>{new Date(date).toLocaleDateString()}</span>
            </div>
            <div className={styles.content}>
                <span>Estado:</span>
                <span>{status}</span>
            </div>
            <button className={styles.buttonAppointment} onClick={() => setShowConfirm(true)}>Cancelar</button>
        </div>
            {showConfirm && (
                <section className={styles.confirmation}>
                    <p>¿Estás seguro de que deseas cancelar este turno?</p>
                    <button onClick={handleConfirmCancel}>Confirmar</button>
                    <button onClick={() => setShowConfirm(false)}>Cancelar</button>
                </section>
            )}

        </>
    );
};

export default Turns;
