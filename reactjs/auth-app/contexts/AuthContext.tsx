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
  signIn(credentials: SignInCredentials): Promise<void>
  // user: User
  user?: User // linha acima é a da aula
  isAuthenticated: boolean
}

export function signOut() {
  console.log('Chamando signOut')
  destroyCookie(undefined, 'auth-app.token')
  destroyCookie(undefined, 'auth-app.refreshToken')

  Router.push('/')
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
      api.get('/me')
        .then(response => {
          const { email, permissions, roles } = response.data

          setUser({ email, permissions, roles })
        })
        .catch(() => {
          console.log('signOut do catch do AuthProvider: ', process.browser)
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

      console.log('Pre push para dashboard. Token: ', token)
      console.log('api.defaults.headers.common.Authorization', api.defaults.headers.common.Authorization)
      console.log('FIM PRE PUSH para dashboard')
      Router.push('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}