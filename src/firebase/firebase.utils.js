import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyDzyCQrdOSKMWBRBEIGeMIetj7HTZsZ-1Q",
  authDomain: "e-commerce-db-90f06.firebaseapp.com",
  databaseURL: "https://e-commerce-db-90f06.firebaseio.com",
  projectId: "e-commerce-db-90f06",
  storageBucket: "e-commerce-db-90f06.appspot.com",
  messagingSenderId: "1016759284827",
  appId: "1:1016759284827:web:76b1ef9282c281c74bfb7e",
  measurementId: "G-L6F5XM777D"
}

firebase.initializeApp(config)

export const createUserProfileDoc = async (userAuth, aditionalData) => {
  if (!userAuth) return
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()
  
  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName, email, createdAt, ...aditionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey)

  const batch = firestore.batch() 
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef, obj)
  })
  return await batch.commit()
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase