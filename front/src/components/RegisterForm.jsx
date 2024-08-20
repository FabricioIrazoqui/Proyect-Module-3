import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/RegisterLogin.module.css';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';

const validationSchema = Yup.object({
    username: Yup.string().required('El nombre de usuario es requerido'),
    password: Yup.string()
        .required('La contraseña es requerida')
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    name: Yup.string().required('El nombre es requerido'),
    email: Yup.string()
        .email('Debe ser un correo electrónico válido')
        .required('El correo electrónico es requerido'),
    nDni: Yup.number().required('El DNI es requerido'),
    birthdate: Yup.string().required('La fecha de nacimiento es requerida'),
});

const RegisterForm = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({username: '', password: ''});
    const [userData, setUserData] = useState({username: '', password: '', name: '', email: '', nDni: '', birthdate: '' });

    const handleOnRegister = async (values, { setSubmitting, resetForm }) => {
        setCredentials({
            username: values.username,
            password: values.password
        });
        setUserData({
            name: values.name,
            email: values.email,
            nDni: values.nDni,
            birthdate: values.birthdate
        });
        const data = {credentials, userData};

        try {
            const response = await axios.post('http://localhost:3000/user/register', data);
            alert(`Usuario ${response.username} agregado con éxito`);
            resetForm();
            navigate('/login');
        } catch (error) {
            alert('Error registrando usuario:', error.response ? error.response.data : error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
                name: '',
                email: '',
                nDni: '',
                birthdate: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleOnRegister}
        >
            {({ isSubmitting }) => (
                <Form>
                    <h2>Registrarse</h2>
                    <div>
                        <label htmlFor="username">Usuario</label>
                        <Field name="username" type="text" />
                        <ErrorMessage className={styles.ErrorMessage} name="username" component="div" />
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña</label>
                        <Field name="password" type="password" />
                        <ErrorMessage className={styles.ErrorMessage} name="password" component="div" />
                    </div>
                    <div>
                        <label htmlFor="name">Nombre</label>
                        <Field name="name" type="text" />
                        <ErrorMessage className={styles.ErrorMessage} name="name" component="div" />
                    </div>
                    <div>
                        <label htmlFor="email">Correo electrónico</label>
                        <Field name="email" type="email" />
                        <ErrorMessage className={styles.ErrorMessage} name="email" component="div" />
                    </div>
                    <div>
                        <label htmlFor="nDni">DNI</label>
                        <Field name="nDni" type="number" />
                        <ErrorMessage className={styles.ErrorMessage} name="nDni" component="div" />
                    </div>
                    <div>
                        <label htmlFor="birthdate">Fecha de nacimiento</label>
                        <Field name="birthdate" type="date" />
                        <ErrorMessage className={styles.ErrorMessage} name="birthdate" component="div" />
                    </div>
                    <button type="submit" disabled={isSubmitting}>Registrar</button>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterForm;
