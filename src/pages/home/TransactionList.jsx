// styles
import { useAuth } from '../../context/AuthContext'
import styles from './Home.module.css'

export default function TransactionList({ transactions }) {
    const { user, loading, deleteDocument } = useAuth()

  return (
    <ul className={styles.transactions}>
         <h2>Transactions for <i style={{ color: 'green' }}>{user.displayName}</i></h2>
         (based on recency of transaction)
         {!transactions.length && <p style={{ marginTop: '1rem'}}>You have not added any transactions yet, 
         <br />Start adding some!</p>}
         {loading && <p>Loading......</p>}
        {transactions?.map((transaction) => (
            <li key={transaction.id}>
            <p className={styles.name}>{transaction.name}</p>
            <p className={styles.amount}>${transaction.amount}</p>
            <button onClick={()=>deleteDocument(transaction.id)}>x</button>
            </li>
        ))}
    </ul>
  )
}