import './style.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Login() {
  const navigate = useNavigate()
  const { login, loading, error: authError } = useAuth()
  const [email, setInputEmail] = useState('')
  const [password, setInputPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Clear errors when inputs change
  useEffect(() => {
    if (error || authError) {
      setError('')
    }
  }, [email, password, error, authError])

  async function handleLogin(e){
    e.preventDefault()
    setError('')
    
    if (!email.trim() || !password.trim()) {
      setError("Preencha todos os campos")
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      setError("Digite um e-mail válido")
      return
    }

    setIsSubmitting(true)
    
    try {
      const result = await login(email.trim(), password)
      if (result.success) {
        console.log("entrou")
        navigate('/Home')
      } else {
        setError(result.error)
      }
    } catch (error) {
      console.error('Login error:', error)
      setError("Erro inesperado. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const displayError = error || authError
  const isLoading = loading || isSubmitting

  return (
    <div className='container-login'>
      <div className="container-inputs">
        <form className='form-login' onSubmit={handleLogin}>
            <input 
              className="input" 
              type="email" 
              placeholder="Digite seu e-mail" 
              value={email}
              onChange={(e) => setInputEmail(e.target.value)} 
              disabled={isLoading}
              required 
            />
            <input 
              className="input" 
              type="password" 
              placeholder="Digite sua senha" 
              value={password}
              onChange={(e) => setInputPassword(e.target.value)} 
              disabled={isLoading}
              required 
            />
            <button 
              className='btn' 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          <Link className="link" to="/Cadastrar"><p>Ainda não tem uma conta?
            <span>  Cadastre-se</span></p></Link>
        </form>
        {displayError && (
          <p style={{ 
            color: 'red', 
            fontSize: '18px', 
            fontWeight: 'bold', 
            margin: '30px', 
            padding: '0', 
            textAlign: 'center' 
          }}>
            {displayError}
          </p>
        )}
      </div>
    </div>
  )
}

export default Login