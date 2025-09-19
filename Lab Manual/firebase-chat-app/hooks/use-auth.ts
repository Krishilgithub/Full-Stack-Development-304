"use client"

import { useState, useEffect } from "react"
import {
  type User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const signUp = async (email: string, password: string, name: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(cred.user, {
      displayName: name,
      photoURL: `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(name)}`,
    })
    await ensureUserDoc(cred.user)
    return cred.user
  }

  const signIn = async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password)
    await ensureUserDoc(cred.user)
    return cred.user
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const cred = await signInWithPopup(auth, provider)
    await ensureUserDoc(cred.user)
    return cred.user
  }

  const logout = () => signOut(auth)

  const ensureUserDoc = async (user: User) => {
    const userRef = doc(db, "users", user.uid)
    const userSnap = await getDoc(userRef)
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || "Anonymous",
        email: user.email,
        photoURL: user.photoURL || "",
        createdAt: serverTimestamp(),
      })
    }
  }

  return {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
  }
}
