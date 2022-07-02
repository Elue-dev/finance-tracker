import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { database } from "../firebase"

export const useCollection = () => {
    const [transactions, setTransactions] = useState()
    const [error, setError] = useState(null)
    const { user } = useAuth()

    const col = 'transactions'
    useEffect(() => {
        setError('')
        const databaseQuery = query(collection(database, col), where('uid', '==', user.uid), orderBy('createdAt', 'desc'))
        try {
            onSnapshot(databaseQuery, (snapshot) => {
                let results = []
                snapshot.docs.forEach(doc => {
                    results.push({ id: doc.id, ...doc.data() })
                })
                setTransactions(results)
            })
        } catch (error) {
            setError(error.message)
        }
    }, [col])

    return { transactions, error }
}