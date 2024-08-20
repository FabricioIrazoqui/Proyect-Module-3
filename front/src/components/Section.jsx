import styles from "../Styles/Section.module.css"
import tunning from "../assets/tunning.jpeg"
import motor from "../assets/motor.jpeg"
import multimedia from "../assets/multimedia.jpeg"
import machine from "../assets/machine.jpeg"

export default function Section() {
    return (
        <div className={styles.container}>
        <section>
            <div>
            <h2>¿Soñas con transformar tu auto en una obra maestra del tuning?</h2>
            
            <p>¡Tu visión, nuestra pasión!. Donde tu sueño se convierte en tu auto.</p>
            </div>
        </section>
        <section>
            <img src={tunning}/>
            <div>
            <h2>Modificaciones estéticas</h2>
            <p>Personaliza tu auto con estilo y dale un toque único, llevá tu vehículo a otro nivel</p>
            <p>Desde kits de carrocería aerodinámicos hasta vinilos personalizados y llantas de aleación de alta gama</p>
            </div>
        </section>
        <section>
            <img src={motor}/>
            <div>
            <h2>Optimización del rendimiento</h2>
            <p>Destaca el aumento de potencia y rendimiento, llevando al limite la liberación del potencial oculto del motor</p>
            <p>potenciamos el motor de tu auto con las últimas tecnologías en escapes, sistemas de admisión y reprogramación de centralitas</p>
            </div>
        </section>
        <section>
            <img src={multimedia}/>
            <div>
            <h2>Sonorización y multimedia</h2>
            <p> Sonido de alta fidelidad y entretenimiento multimedia para viajes inolvidables. Resalta la posibilidad de disfrutar de música a todo volumen.</p>
            <p>instalamos sistemas de audio y video de alta fidelidad, pantallas táctiles y accesorios</p>
            </div>
        </section>
            <section>
                <img src={machine}/>
                <div>
                    <h2>Maquinaria de última generación</h2>
                    <p>Ponemos a tu disposición la más avanzada tecnología y experiencia para hacer realidad tus ideas más audaces.</p>
                    <p>Adéntrate en nuestro taller de última generación, donde la pasión por el motor se fusiona con la precisión de la maquinaria de vanguardia. </p>
                </div>
            </section>
        </div>
    )
}