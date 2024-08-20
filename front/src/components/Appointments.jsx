import { useState, useEffect } from "react";
import styles from "../Styles/Appointments.module.css";
import Turns from "./Turns";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../redux/reduce";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
    date: Yup.string().required("La fecha es requerida"),
    time: Yup.string().required("La hora es requerida"),
    description: Yup.string().required("La descripción es requerida")
});

export default function Appointments() {
    
    const [formVisible, setFormVisible] = useState(false);
    const [appointment, setAppointment] = useState({
        date: "", 
        time: "10:00", 
        description: "Pintura"
    })
    const dispatch = useDispatch();
    const appointments = useSelector((state) => state.todos.todos);
    const userId = useSelector((state) => state.auth.user?.id);

    useEffect(() => {
        axios.get('http://localhost:3000/appointments')
            .then(response => {
                response.data.forEach((appointment) => {
                    dispatch(addTodo({
                        id: appointment.id,
                        date: appointment.date,
                        time: appointment.time,
                        description: appointment.description,
                        status: appointment.status
                    }));
                });
            })
            .catch(error => alert('Error fetching appointments:', error));
    }, [dispatch]);

    const handleFormSubmit = async (values, { resetForm }) => {
        setAppointment({
            date: values.date,
            time: values.time,
            description: values.description,
            userId: userId
        })
        const data = appointment
        try {
            const response = await axios.post('http://localhost:3000/appointments/schedule', data);
            const newAppointment = response.data;
            dispatch(addTodo({
                id: newAppointment.id,
                date: newAppointment.date,
                time: newAppointment.time,
                description: newAppointment.description,
                status: newAppointment.status
            }));
            alert('turno creado con exito')
            resetForm();
            setFormVisible(false); 
        } catch (error) {
            alert('Error creating appointment:', error);
        }
    };

    const handleUpdate = (updatedAppointment) => {
        dispatch(updateTodo(updatedAppointment));
    };

    return (
        <div className={styles.container}>
            {appointments.length === 0 ? (
                <h2>No hay turnos disponibles</h2>
            ) : (
                <div className={styles.list}>
                    {   appointments.map((appointment) => (                        
                        <Turns key={appointment.id} appointment={appointment} onUpdate={handleUpdate} userId={userId} />
                    ))}
                </div>
            )}
            <button onClick={() => setFormVisible(!formVisible)}>
                Solicitar Turno
            </button>
            {formVisible && (
                <Formik
                    initialValues={{ date: "", time: "10:00", description: "Pintura" }}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                >
                    {({ isSubmitting, resetForm }) => (
                        <Form className={styles.form}>
                            <h2>Ingrese los datos de su turno a solicitar</h2>
                            <div>
                                <Field name="date" type="date" />
                                <ErrorMessage name="date" component="div" className={styles.error} />
                            </div>
                            <div>
                                <Field as="select" name="time">
                                    <option value="10:00">10:00</option>
                                    <option value="10:30">10:30</option>
                                    <option value="11:00">11:00</option>
                                    <option value="11:30">11:30</option>
                                    <option value="12:00">12:00</option>
                                    <option value="12:30">12:30</option>
                                    <option value="13:00">13:00</option>
                                    <option value="13:30">13:30</option>
                                    <option value="14:00">14:00</option>
                                    <option value="14:30">14:30</option>
                                    <option value="15:00">15:00</option>
                                    <option value="15:30">15:30</option>
                                    <option value="16:00">16:00</option>
                                    <option value="16:30">16:30</option>
                                    <option value="17:00">17:00</option>
                                    <option value="17:30">17:30</option>
                                </Field>
                                <ErrorMessage name="time" component="div" className={styles.error} />
                            </div>
                            <div>
                                <Field as="select" name="description">
                                    <option value="Pintura">Pintura</option>
                                    <option value="Mecanica">Mecanica</option>
                                    <option value="FullTunning">FullTunning</option>
                                </Field>
                                <ErrorMessage name="description" component="div" className={styles.error} />
                            </div>
                            <div>
                                <button className={styles.button} type="submit" disabled={isSubmitting}>
                                    Reservar turno
                                </button>
                                <button 
                                    className={styles.button} 
                                    type="reset" 
                                    onClick={() => {
                                        resetForm();
                                        setFormVisible(false);
                                    }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            )}
        </div>
    );
}
