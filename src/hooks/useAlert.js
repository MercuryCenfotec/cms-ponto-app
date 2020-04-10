import { useEffect, useState } from 'react'

export const useAlert = (show = false, type = 'info', newMessage = '') => {
  const [alert, setAlert] = useState(false)
  const [color, setColor] = useState('info')
  const [message, setMessage] = useState('')

  useEffect(() => {
    setAlert(show)
    setColor(type)
    setMessage(newMessage)
  }, [show])

  return {
    alert,
    type,
    message,
    hide: () => {
      setAlert(false)
    },
    show: (show = false, type = 'info', newMessage = '') => {
      setAlert(show)
      setColor(type)
      setMessage(newMessage)
    },
  }
}
