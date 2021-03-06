import app from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/auth'
import { config } from './config'

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.db = app.database()
    this.dbFS = app.firestore()
    this.googleProvider = new app.auth.GoogleAuthProvider()
    this.facebookProvider = new app.auth.FacebookAuthProvider()
    this.twitterProvider = new app.auth.TwitterAuthProvider()
  }
  async register(name, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    )

    return await newUser.user.updateProfile({
      displayName: name
    })
  }

  async login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password)
  }

  async logout() {
    await this.auth.signOut()
  }

  async resetPassword(email) {
    await this.auth.sendPasswordResetEmail(email)
  }
}

const firebase = new Firebase()

export default firebase
