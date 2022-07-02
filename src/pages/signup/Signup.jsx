import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from "react-router-dom";
// styles
import styles from './Signup.module.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const { signup, updateName, user } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
   
    try {
      setLoading(true)
      setError(null)
      await signup(email, password)
      await updateName(displayName)
      navigate('/')
      console.log(user)
      setLoading(false)
    } catch(err) {
        setError(err.message)
        setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2>Sign up</h2>
      {error && <p>{error}</p>}
      <label>
        <span>Email:</span>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
        />
      </label>
      <label>
        <span>Display name:</span>
        <input 
          type="text" 
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <button className="btn">{loading ? 'Loading...' : 'Sign up'}</button>
    </form>
  )
}