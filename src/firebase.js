import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCT2EEI6qXytxKP8yXQZxYDRKVF8gZhiL0",
    authDomain: "finance-tracker-ff92b.firebaseapp.com",
    projectId: "finance-tracker-ff92b",
    storageBucket: "finance-tracker-ff92b.appspot.com",
    messagingSenderId: "498514402854",
    appId: "1:498514402854:web:e6fa1e06f9f2cd735b50e7"
  };

const app = initializeApp(firebaseConfig)
const database = getFirestore()
export const auth = getAuth(app)
export default app

export { database }