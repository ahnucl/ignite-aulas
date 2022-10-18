import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import Router from 'next/router'
import { api } from "../services/api";

interface User {
  email: string
  permissions: string[]
  roles: string[]
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>
  user?: User
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as AuthContextData)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user
  
  useEffect(() => {
    const { 'auth-app.token': token } = parseCookies()

    if(token) {
      api.get('/me').then(response => {
        const { email, permissions, roles } = response.data

        setUser({ email, permissions, roles })
      })
    }

  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {

      const response = await api.post('sessions', {
        email, 
        password,
      })
      
      const { token, refreshToken, permissions, roles } = response.data

      setCookie(undefined, 'auth-app.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/', // quais caminhos da aplicação terão acesso ao cookie
      })
      
      setCookie(undefined, 'auth-app.refreshToken', refreshToken,{
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/', // quais caminhos da aplicação terão acesso ao cookie
      })

      setUser({
        email,
        permissions,
        roles,
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      Router.push('/dashboard')
    } catch (err) {
      console.error(err)
    }
  }
  
  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}