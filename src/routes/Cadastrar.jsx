
import { useState } from 'react';
import api from '../services/api'
import './style.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Cadastrar() {

  const navigate = useNavigate();
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputAge, setInputAge] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputSenha2, setInputSenha2] = useState('');
    const [error, setError] = useState('');
    const [inputBiografia, setInputBio] = useState('')

    async function createUsers() {
      if(inputName === '' || inputEmail === '' || inputAge === '' || inputPassword === '' || inputSenha2 === '') {
        setError("Preencha todos os campos")
      }else{

        if (inputPassword === inputSenha2) {
          try{
            await api.post('/auth/register', {
              name: inputName,
              email: inputEmail,
              age: inputAge,
              password: inputPassword,
              confirmPassword: inputSenha2,
              biografia: inputBiografia,
            })
           navigate('/Login')
          }
            catch (error) {
              if (!error?.response) {
                setError("Erro ao acessar ao servidor")
              }
          else {
            setError("Erro ao acessar ao servidor")
          }
        }
      }else{
        setError("As senhas devem ser iguais")
      }
    }
    }

    return (
      <div className='container-cadastro'>
      <div className="container-inputs-cadastro">
        <form className='form-cadastro'>
          <div className='border-box'>
          <input className="input" type="text" placeholder="Digite seu primeiro nome" onChange={(e) => setInputName(e.target.value)} required/>
          </div>
          <div className='border-box'>
          <input className="input" type="text" placeholder="Digite seu e-mail" onChange={(e) => setInputEmail(e.target.value)} required/>
          </div>
          <div className='border-box'>
          <input className="input" type="text" placeholder="Digite sua idade" onChange={(e) => setInputAge(e.target.value)} required/>
          </div>
          <div className='border-box'>
          <input className="input" type="text" placeholder="Conte um pouco sobre você..." onChange={(e) => setInputBio(e.target.value)} required/>
          </div>
          <div className='border-box'>
          <input className="input" type="password" placeholder="Digite sua senha" onChange={(e) => setInputPassword(e.target.value)} required/>
          </div>
          <div className='border-box'>
          <input className="input" type="password" placeholder="Confirme sua senha" onChange={(e) => setInputSenha2(e.target.value)} required/>
          </div>
          <Link className="link" to="/Login"><p>Ja tem uma conta?  
          <span>  Entrar</span></p></Link>
          <button className='btn' type="submit" onClick={(e) => createUsers(e)}>Cadastrar</button>
          <p style={{color: 'red', fontSize: '12px', fontWeight: 'bold', margin: '0', padding: '0', textAlign: 'center'}}>{error}</p>
        </form>
     </div>
    </div>
    )
}