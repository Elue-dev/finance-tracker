import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
      try {
        await logout()
        navigate('/login')
      } catch(err) {
        console.log(err.message)
      }
  }

  return (
    <nav className={styles.navbar}>
        <ul>
            <li className={styles.title}><Link to='/'>transApp</Link></li>
            {user ? (
              <>
                <li className={styles.username}>Hello, <b>{user.displayName}</b></li>
                <button className='btn' onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/signup'>Sign Up</Link></li>
              </>
            )}
        </ul>
    </nav>
  )
}
