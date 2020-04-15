import { db } from '../services/firebase.js'
import { useEffect, useState } from 'react'

export const useAllUsers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    try {
      db.ref('Users').on('value', (snapshot) => {
        let array = []
        snapshot.forEach((snap) => {
          array.push(snap.val())
        })
        setUsers(array)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return {
    users,
  }
}
