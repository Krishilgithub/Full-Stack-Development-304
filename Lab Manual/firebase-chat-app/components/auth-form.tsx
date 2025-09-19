"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const { signUp, signIn, signInWithGoogle } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (isSignUp) {
        await signUp(email, password, name || email.split("@")[0])
      } else {
        await signIn(email, password)
      }
    } catch (error: any) {
      alert(error.message)
    }
    setLoading(false)
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      await signInWithGoogle()
    } catch (error: any) {
      alert(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
            <CardTitle className="text-2xl font-bold text-white">Chatter</CardTitle>
          </div>
          <h2 className="text-xl text-white">{isSignUp ? "Create account" : "Welcome back"}</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="text-sm text-white/80 block mb-1">Name</label>
                <Input
                  type="text"
                  placeholder="Ada Lovelace"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-black/20 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            )}
            <div>
              <label className="text-sm text-white/80 block mb-1">Email</label>
              <Input
                type="email"
                placeholder="ada@chatter.app"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-black/20 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div>
              <label className="text-sm text-white/80 block mb-1">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-black/20 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? "Loading..." : isSignUp ? "Sign up" : "Sign in"}
            </Button>
          </form>

          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
            disabled={loading}
          >
            Continue with Google
          </Button>

          <div className="text-center text-sm text-white/70">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-blue-400 hover:underline">
              {isSignUp ? "Sign in" : "Create one"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
