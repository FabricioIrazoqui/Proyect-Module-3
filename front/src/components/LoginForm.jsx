import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/RegisterLogin.module.css'; 
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice.js';

const validationSchema = Yup.object({
    username: Yup.string().required('El nombre de usuario es requerido'),
    password: Yup.string()
        .required('La contraseña es requerida')
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOnLogin = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await axios.post('http://localhost:3000/user/login', { credentials: values });
            alert('Usuario autenticado:', response.data);
            dispatch(login(response.data.user));
            resetForm();
            navigate('/');
        } catch (error) {
            alert('Error autenticando usuario:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleOnLogin}
        >
            {({ isSubmitting }) => (
                <Form>
                    <h2>Iniciar Sesión</h2>
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
                    <button type="submit" disabled={isSubmitting}>Iniciar Sesión</button>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
