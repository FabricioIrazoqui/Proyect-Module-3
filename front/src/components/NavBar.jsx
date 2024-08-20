import styles from '../Styles/NavBar.module.css';
import LoginLogo from '../assets/LoginButton.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

export default function NavBar() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout()); 
        navigate('/');
    };

    return (
        <div className={styles.Container}>
            <div className={styles.ZT}>
                <h1>ZonaTunning</h1>
            </div>
            <div className={styles.NavBar}>
                <Link to="/" className={styles.Link}>Inicio</Link>
                {isLoggedIn && (<Link to="/appointments" className={styles.Link}>Turnos</Link>)}
                <Link to="/about" className={styles.Link}>Nosotros</Link>
            </div>
            <div>
                {!isLoggedIn && (
                    <Link to="/login">
                        <img className={styles.LoginLogo} src={LoginLogo} alt="user" />
                    </Link>
                )}
                {isLoggedIn && (
                    <button onClick={handleLogout} className={styles.button}>Cerrar Sesión</button>
                )}
            </div>
        </div>
    );
}
