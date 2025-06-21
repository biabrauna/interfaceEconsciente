import './style.css'
import api from '../services/api'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [email, setInputEmail] = useState('')
  const [password, setInputPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password)
      if (email === '' || password === '') {
        setError("Preencha todos os campos")
      }
      else {
        const response = await api.post('/auth/user',
          { email, password },
        )
        console.log(response)
        if (response.data.access_token) {
          localStorage.setItem('token', response.data.access_token)
          navigate('/Home')
        }
      }
    }
    catch (error) {
      console.log(error)
      setError("Erro ao fazer login. Verifique suas credenciais.")
    }
  }

  return (
    <div className='container-login'>
      <div className="container-inputs">
        <form className='form-login'>
            <input className="input" type="text" placeholder="Digite seu e-mail" onChange={(e) => setInputEmail(e.target.value)} required />
            <input className="input" type="password" placeholder="Digite sua senha" onChange={(e) => setInputPassword(e.target.value)} required />
          <button className='btn' type="submit" onClick={(e) => handleLogin(e)}>Entrar</button>
          <Link className="link" to="/Cadastrar"><p>Ainda não tem uma conta?
            <span>  Cadastre-se</span></p></Link>
        </form>
        <p style={{ color: 'red', fontSize: '18px', fontWeight: 'bold', margin: '30px', padding: '0', textAlign: 'center' }}>{error}</p>
      </div>
    </div>
  )
}

export default Login