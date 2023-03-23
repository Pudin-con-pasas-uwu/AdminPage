import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/login.module.css'
import logo from '../imgs/logo.jpg'



const LoginPage = () => {
    
    const router = useRouter()
    const [username,setUser] = useState('')
    const [password,setPassword] = useState('')
    const [errors,setError] = useState([])

    async function handleSubmit (e){
        e.preventDefault()
        setError([]);
        if (username === ''){
            setError(errors => [...errors,'Agrega tu nombre de usuario']);
            return false;
        }
        if (password === ''){
            setError(errors => [...errors,'Agrega tu contraseña']);
            return false;
        }

        const data = { email: username, password};
        const url = 'https://ecommerce-unid.000webhostapp.com/auth';
        const response = await fetch (url, { method:'POST', body: JSON.stringify(data)});

        if (!response.ok){
            setError(errors => [...errors,'No se pudo conectar con el servidor']);
            return false;
        }

        const json = await response.json();
        console.log(json);
    }
    function handleUsernameChange(event) {
        setUser(event.target.value);
    }
      
    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }  
    
    return(    
        <main>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.logo}>
                        <Link href="/">
                            <Image src={logo} alt="logo" width={215} height={90}/>
                        </Link>
                    </div>
                    <div className={styles.titulo}>
                        <p>¡BIENVENIDO! </p>
                    </div>
                    <div className={styles.formularioLI}>
                        <form onSubmit={handleSubmit} className={styles.forml}>
                            <div>
                                <label htmlFor="username" className={styles.label}>Usuario</label>
                                <input type="text" value={username} class="form-control me-2" onChange={handleUsernameChange} className={styles.iinput} placeholder= 'Correo electrónico'/>
                            </div>
                            <div>
                                <label htmlFor="password">Contraseña</label>
                                <input type="password" value={password} class="form-control me-2" onChange={handlePasswordChange} className={styles.iinput} placeholder= 'Contraseña' />
                            </div>
                            <button type='buttom' onClick={() => router.push('/ProductsModule')} className={styles.button}>Iniciar sesión</button>
                        </form>
                        <p>{errors}</p>
                    </div>
                </div>
            </div>
        </main>
    )

}



export default LoginPage;