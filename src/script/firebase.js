// firebase setup
import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyDmsE7c8pFGoV915pRfQfTD3c29UCm2OLQ',
  authDomain: 'project-hex-hex.firebaseapp.com',
  databaseURL: 'https://project-hex-hex.firebaseio.com',
  projectId: 'project-hex-hex',
  storageBucket: 'project-hex-hex.appspot.com',
  messagingSenderId: '290868166841'
}

const firebaseApp = firebase.initializeApp(config)

const storageKey = 'KEY_FOR_LOCAL_STORAGE'

const auth = firebaseApp.auth()

const storage = firebaseApp.storage()

const isAuthenticated = () => {
  return !!auth.currentUser || !!localStorage.getItem(storageKey)
}

export {firebaseApp, storageKey, auth, isAuthenticated, storage}
