import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

export default function ErrorPage(){
    const navigate = useNavigate()
    const [countDown, setCountDown ] = useState(5)

    useEffect(() =>{
        const countDownInterval = setInterval(()=>{
            setCountDown((prevCountDown) => prevCountDown - 1 )
        }, 1000)

        setTimeout(()=>{
            clearInterval(countDownInterval)
            navigate('/')
        }, 5000)

        return () => clearInterval(countDownInterval)

    }, [navigate])

    return (
        <div>
            <h1>Page not found</h1>
            <p>Redireccionando a la pagina principal en {countDown} segundos...</p>
        </div>
    )
}