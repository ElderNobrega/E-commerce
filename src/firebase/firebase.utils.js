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

export const convertCollectionsSnapshotToMap = (collections => {
  const transformedCollections = collections.docs.map(doc => {
    const { title, items } = doc.data()

    return {
      routName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })
  return transformedCollections.reduce((acummulator, collection) => {
    acummulator[collection.title.toLowerCase()] = collection
    return acummulator
  }, {})
})

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe()
      resolve(userAuth)
    }, reject)
  })
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase