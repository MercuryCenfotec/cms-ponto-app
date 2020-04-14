import { db } from '../services/firebase.js'
import { useEffect, useState } from 'react'

export const useAllUsers = () => {
  const [users, setUsers] = useState([])
  const [reload, setReload] = useState(false)

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
    setReload(false)
  }, [reload])

  return {
    users,
    isReload: () => {
      setReload(true)
    },
  }
}
