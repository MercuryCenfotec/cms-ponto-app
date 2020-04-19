import { db } from '../services/firebase.js'
import { useEffect, useState } from 'react'

export const useAllServiceTypes = (setHook) => {
  const [serviceTypes, setServiceTypes] = useState([])
  const [reload, setReload] = useState(false)

  useEffect(() => {
    try {
      db.ref('ServiceTypes').on('value', (snapshot) => {
        let array = []
        snapshot.forEach((snap) => {
          array.push(snap.val())
        })
        setServiceTypes(array)
      })
    } catch (error) {
      console.log(error)
    }
    setReload(false)
  }, [reload])

  return {
    serviceTypes,
    isReload: () => {
      setReload(true)
    },
  }
}
