import { initializeApp } from 'firebase/app'
import {
  signOut,
  getAuth,
  signInWithEmailAndPassword,
  signInWithRedirect,
  // getRedirectResult,
  GoogleAuthProvider,
  FacebookAuthProvider,
  deleteUser,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

// Sign In / Out with email and password
export const signOutBtn = () => {
  const auth = getAuth()
  return signOut(auth)
    .then(() => {
      // Sign-out successful.
      return true
    })
    .catch((error) => {
      // An error happened.
      console.log({ error })
      alert(error)
      return false
    })
}

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      let user = userCredential.user
      if (user) {
        if (!user.emailVerified) {
          alert('Akun belum diverifikasi')
          if (confirm('Kirim ulang email verifikasi?')) {
            const auth = getAuth()
            await sendEmailVerification(auth.currentUser).then(() => {
              // Email verification sent!
              alert('Email verifikasi berhasil dikirim ulang')
            })
          }
          auth.signOut()
          return 0
        } else {
          return true
        }
      }
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log({ errorCode }, { errorMessage })
      alert(errorCode, errorMessage)
      return 2
    })
}

// Sign In / Out with google
export const signInWithGoogle = async () => {
  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
  auth.useDeviceLanguage()
  signInWithRedirect(auth, provider)
}

// Sign In / Out with facebook
export const signInWithFacebook = () => {
  const auth = getAuth()
  const provider = new FacebookAuthProvider()
  provider.addScope('public_profile')
  auth.useDeviceLanguage()
  signInWithRedirect(auth, provider)
}

export const deleteUserAccount = () => {
  const auth = getAuth()
  const user = auth.currentUser

  deleteUser(user)
    .then(() => {
      // User deleted.
      alert('Akun berhasil dihapus!')
    })
    .catch((error) => {
      // An error ocurred
      alert(error)
    })
}

export const resetPassword = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      alert('Email pembaruan password telah dikirim!')
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      alert(errorCode, errorMessage)
    })
}

export const dataUser = () => {
  const auth = getAuth()
  const user = auth.currentUser

  if (user !== null) {
    return user.providerData
  }
}

export const updateDataUser = async (newName) => {
  const auth = getAuth()
  await updateProfile(auth.currentUser, {
    displayName: newName,
    photoURL: null,
  })
    .then(() => {
      // Profile updated!
      alert('Nama berhasil diubah!')
    })
    .catch((error) => {
      // An error occurred
      alert(error)
    })
}
