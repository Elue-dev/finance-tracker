import { useState, useEffect, useReducer } from 'react'
import { database } from '../firebase'
import { addDoc } from 'firebase/firestore'

const initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const fireStoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return {...state, isPending: true }
        default:
            return state
    }
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer({fireStoreReducer, initialState})
    const [isCancelled, setIsCancelled] = useState(false)

    const colRef = collection(database, 'transactions')

    const addDocument = () => {
        dispatch({ type: 'IS_PENDING' })
    }

    const deleteDocument = () => {

    }

    useEffect(() => {
       return () => {
        setIsCancelled(true)
       }
    }, [])

    return { addDocument, deleteDocument, response }
}