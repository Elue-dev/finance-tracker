import React, { useContext, useState, useEffect } from 'react'
import { database } from '../firebase'
import { auth } from '../firebase'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from 'firebase/auth'
import { addDoc, collection, deleteDoc, doc, serverTimestamp} from 'firebase/firestore'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    } 

    function logout() {
        return signOut(auth)
    } 

    function updateName(displayName) {
         updateProfile(auth.currentUser, {displayName: displayName})
    }

    const addDocument = async (document) => {
        try {
            setLoading(true)
            const colRef = collection(database, 'transactions')
            await addDoc(colRef, {...document, createdAt: serverTimestamp(), uid: user.uid} )
            setLoading(false)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    const deleteDocument = async (id) => {
        try {
            setLoading(true)
            const colRef = doc(database, 'transactions', id)
            await deleteDoc(colRef).then((doc) => {
                doc.reset()
              })
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        const unsubscribe  = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const value = {
        user,
        signup,
        login,
        logout,
        updateName,
        addDocument,
        deleteDocument,
        loading
    }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthContext