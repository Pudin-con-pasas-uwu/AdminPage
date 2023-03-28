import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/login.module.css'
import logo from '../imgs/logo.jpg'
import { WindowSharp } from '@mui/icons-material'



const LoginPage = () => {

    const router = useRouter()
    const [form, setForm] = useState({
        email: '',
        password: ''
      })
    
      const handleChange = (e) => {
        const {value, name} = e.target
        setForm({
          ...form,
          [name]: value
        })
      }
    
      const [error, setError] = useState('')
      const handleSubmit = (e) => {
        e.preventDefault();
        
        if (form.email === "" || form.email === "") {
            setError(" Ingrese credenciales de Administración.");
            return false;
        } else{
        setError("Conexión exitosa");
        
        }
        postData(form);
      }

      const postData = async (form) => {
        try {
          console.log(form)
          const options = {
            method: 'POST',
            body: JSON.stringify(form)
          };
          const res = await fetch("https://ecommerce-unid.000webhostapp.com/admin", options);
          const data = await res.json();
          console.log(data);
          router.push('/ProductsModule');
          if(data?.token){
            sessionStorage.setItem("token", data.token)
          }
          
        } catch (error) {
          console.log(error)
        }
      } 
    
    return(    
            <main>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.logo}>
                            <Link href="/">
                                <Image src={logo} alt="logo" width={200} height={80}/>
                            </Link>
                        </div>
                        <div className={styles.titulo}>
                            <p>¡BIENVENIDO! </p>
                        </div>
                        <div className={styles.formularioLI}>
                        {error && <div className={styles.error}>{error}</div>}
                            <form onSubmit={handleSubmit} className={styles.forml}>
                                <div>
                                    <label className={styles.label} >Usuario</label>
                                    <input type="email" name="email" value={form.email} onChange={handleChange} className={styles.iinput} />
                                </div>
                                <div>
                                    <label className={styles.label} >Contraseña</label>
                                    <input type="password" name="password" value={form.password} onChange={handleChange} className={styles.iinput} />
                                </div>
                                <button type='buttom' className={styles.button}>Iniciar sesión</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        )

}




export default LoginPage;