// styles
import styles from './Home.module.css'

// components
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'
import { useCollection } from '../../hooks/useCollection'
import { useAuth } from '../../context/AuthContext'

export default function Home() {
  const { transactions, error } = useCollection()
  const { user } = useAuth()

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {!transactions && <p>Loading...</p>}
        {transactions && <TransactionList transactions={transactions} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm/>
      </div>
    </div>
  )
}