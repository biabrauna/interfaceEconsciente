
import './style.css'
// eslint-disable-next-line no-unused-vars
import api from '../services/api'
import { useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function Login() {
  const navigate = useNavigate()
  const [email, setInputEmail] = useState('')
  const [password, setInputPassword] = useState('')
  const [error, setError] = useState('')

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     console.log(inputEmail, inputPassword)
  //   if (inputEmail === '' || inputPassword === '') {
  //     setError("Preencha todos os campos")
  //   }
  //   else{
      
  //       const response = await api.post('/auth/user',
  //         JSON.stringify({inputEmail, inputPassword}),
  //         // {
  //         //   headers: {
  //         //     'Content-Type': 'application/json'
  //         //   }
  //         // }
  //       )
  //       console.log(response)
  //        if (response !== null) {
  //         if(response.email === inputEmail && response.password === inputPassword){
  //           setUser(response)
  //           navigate(`/Home/${user.id}`)
  //         }else{
  //           setError("Email ou senha incorretos")
  //         }
  //        }
  //       }
  //     }

  // catch (error) {
  //   if (!error?.response) {
  //     if (user !== null) {
  //       navigate(`/Home/${user.id}`)
  //     }else{
  //       setError("Erro ao acessar ao servidor")
  //     }
  //   }
  //   else{
  //     setError("Erro desconhecido, tente novamente")
  //   }
  // }
  // }

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        console.log(email, password)
      if (email === '' || password === '') {
        setError("Preencha todos os campos")
      }
      else{
          const json = JSON.stringify({email, password})
          console.log(json)
          const response = await api.post('/auth/user',
            json,
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          )
            console.log(response)
            if (response.data.message === "Login realizado com sucesso") {
              navigate(`/Home/${response.data.userId}`)
          }}}
      catch (error) {
        console.log(error)
        }
      }

  return (
    <div className='container-login'>
        <div className="container-inputs">
          <form className='form-login'>
            <div className='border-box'>
            <input className="input" type="text" placeholder="Digite seu e-mail" onChange={(e) => setInputEmail(e.target.value)} required/>
            </div>
            <div className='border-box'>
            <input className="input" type="password" placeholder="Digite sua senha" onChange={(e) => setInputPassword(e.target.value)} required/>
            </div>
            <button className='btn' type="submit" onClick={(e) =>handleLogin(e)}>Entrar</button>
            <Link className="link" to="/Cadastrar"><p>Ainda não tem uma conta?  
            <span>  Cadastre-se</span></p></Link>
          </form>
        <p style={{color: 'red', fontSize: '18px', fontWeight: 'bold', margin: '30px', padding: '0', textAlign: 'center'}}>{error}</p>
        </div>
      </div>
  
   )
}

export default Login