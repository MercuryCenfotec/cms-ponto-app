import firebase from 'firebase'
import config from '../constants/firebaseConfig'

firebase.initializeApp(config)
export const db = firebase.database()
