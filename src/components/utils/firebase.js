import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

// var config = {
//   apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
//   authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
//   databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
//   projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
//   storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
//   messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID
// }

// for Dev
var config = {
  apiKey: 'AIzaSyCjIaXF7ZRGK0YWp_HJq4chXQ3jWqD46FU',
  authDomain: 'ghost-right-dev.firebaseapp.com',
  databaseURL: 'https://ghost-right-dev.firebaseio.com',
  projectId: 'ghost-right-dev',
  storageBucket: 'ghost-right-dev.appspot.com',
  messagingSenderId: '307155485013'
}

// var config = {
//   apiKey: 'AIzaSyA0cJ4YGvhiN_BX9dsV2Pm8nSSF-qY98Ww',
//   authDomain: 'ghost-rights.firebaseapp.com',
//   databaseURL: 'https://ghost-rights.firebaseio.com',
//   projectId: 'ghost-rights',
//   storageBucket: 'ghost-rights.appspot.com',
//   messagingSenderId: '483501591562'
// }

const firebaseApp = firebase.initializeApp(config)

const strage = firebaseApp.storage()
const auth = firebaseApp.auth()
const firestore = firebaseApp.firestore()

export default firebaseApp.firestore()
// export {strage}
export { firestore, firebase, strage, auth }
