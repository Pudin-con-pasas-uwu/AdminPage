import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/login.module.css'
import logo from '../imgs/logo.jpg'


const LoginPage = () => {
  
  const [form, setForm] = useState({
    email: '',
    password: ''
  });


const handleChange = (e) => {
  const { value, name } = e.target;
  setForm({
    ...form,
    [name]: value
  });
};

const router = useRouter();
const [error, setError] = useState('');

// Aquí se verifica si ya existe un token en el localStorage
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('adminToken');
  if (token) {
    router.replace('/ProductsModule'); // <- Aquí se redirecciona a la página de productos
  }
}

const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.email.trim() === '' || form.password.trim() === '') {
    setError('Ingrese credenciales');
    return;
  }

  try {
    console.log(form);
    const options = {
      method: 'POST',
      body: JSON.stringify(form)
    };

    const res = await fetch('https://ecommerunid.sistemasdelcaribe.com/admin', options);
    const data = await res.json();
    console.log(data);

    if (data?.token) {
      localStorage.setItem('adminToken', data.token); // <- Aquí se guarda el token en localStorage
      setError('Bienvenido a la Comarca');
      router.push('/ProductsModule');
      return false;
    } else {
      setError('Ingrese las credenciales correctas Muggle');
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
    
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
                            <form className={styles.forml}>
                                <div>
                                    <label className={styles.label} >Usuario</label>
                                    <input type="email" name="email" value={form.email} onChange={handleChange} className={styles.iinput} />
                                </div>
                                <div>
                                    <label className={styles.label} >Contraseña</label>
                                    <input type="password" name="password" value={form.password} onChange={handleChange} className={styles.iinput} />
                                </div>
                                <button type='buttom' className={styles.button} onClick={handleSubmit}>Iniciar sesión</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        )

}




export default LoginPage;