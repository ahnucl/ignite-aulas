import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from 'next/router'

import { api } from "../services/apiClient";

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
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  // user: User
  user?: User // linha acima é a da aula
  isAuthenticated: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel

export function signOut(shouldBroadcast = true) {
  console.log('Saindo...')
  destroyCookie(undefined, 'auth-app.token')
  destroyCookie(undefined, 'auth-app.refreshToken')

  shouldBroadcast && authChannel.postMessage('signOut')

  Router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')
    
    authChannel.onmessage = (message) => {
      console.log('Socorro Deus')
      console.log('Router',Router)
      console.log('message.data', message.data)
      switch (message.data) {
        case 'signOut':
          signOut(false)
          break
        case 'signIn':
          // Router.push('/dashboard')
          Router.reload()
          break
        default:
          break
      }
    }
  }, [])

  useEffect(() => {
    const { 'auth-app.token': token } = parseCookies()

    if(token) {
      api.get('/me')
        .then(response => {
          const { email, permissions, roles } = response.data

          setUser({ email, permissions, roles })
        })
        .catch(() => {
          signOut()
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

      setCookie(undefined, 'auth-app.TESTE', 'Meu teste', {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/', // quais caminhos da aplicação terão acesso ao cookie
      })

      setUser({
        email,
        permissions,
        roles,
      })

      api.defaults.headers.common.Authorization = `Bearer ${token}`
      // api.defaults.headers['Authorization'] = `Bearer ${token}`

      Router.push('/dashboard')

      authChannel.postMessage('signIn')
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}