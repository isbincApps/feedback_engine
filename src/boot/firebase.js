
import Firebase from 'firebase/app'
// require('firebase/auth')
import firebaseConfig from '../utils/firebase_conf'
import 'firebase/firestore'
import { firestorePlugin } from 'vuefire'

export default ({ Vue }) => {
  // Initialize Firebase from settings
  if (!Firebase.apps.length) Firebase.initializeApp(firebaseConfig)
  const firestore = Firebase.firestore()
  Vue.use(firestorePlugin) 
  Vue.prototype.$firebase = Firebase
  Vue.prototype.$db = firestore
}

/*
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : ''
export const auth = firebase.auth()
export default ({ Vue }) => {
   Vue.prototype.$firebase = firebase
}
*/
/*
import Firebase from 'firebase/app'
import 'firebase/firestore' // eslint-disable-line
import firebaseConfig from '../utils/firebase_conf'
let fireApp = null
if (!Firebase.apps.length) {
    fireApp = Firebase.initializeApp(firebaseConfig)
}
// export const AUTH = fireApp.auth()

export default ({ Vue }) => {
  // Initialize Firebase from settings
  // Firebase.initializeApp(firebaseConfig)
  if (fireApp)
  	Vue.prototype.$firebase = fireApp
}
*/