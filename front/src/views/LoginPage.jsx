import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import styles from '../Styles/RegisterLogin.module.css'

export default function LoginPage() {
    const [showLogin, setShowLogin] = useState(true);

     const toggleForm = () => {
        setShowLogin(prevShowLogin => !prevShowLogin);
    };

    return (
        <div className={styles.container}>
            {showLogin ? (
                <div>
                    <LoginForm />
                    <p onClick={toggleForm} className={styles.p}>
                        ¿No tienes una cuenta? Registrarse
                    </p>
                </div>
            ) : (
                <div>
                    <RegisterForm />
                    <p onClick={toggleForm} className={styles.p}>
                        ¿Ya tienes una cuenta? Iniciar Sesión
                    </p>
                </div>
            )}
        </div>
    );
}
