import { AuthTokenError } from './errors/AuthTokenError';
import { GetServerSidePropsContext } from 'next';
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '../contexts/AuthContext'

interface ApiError {
  error: boolean,
  code: string,
  message: string
}

let isRefreshing = false
let failedRequestsQueue: any[] = []

export function setupAPIClient(ctx: GetServerSidePropsContext | undefined = undefined) {
  let cookies = parseCookies(ctx) // sem o contexto não funciona no lado do servidor
  
  const api = axios.create({
    baseURL: 'http://localhost:3333',
    // headers: {
    //   Authorization: `Bearer ${cookies['auth-app.token'] ?? 'meu teste'}`
    // }
  })

  api.defaults.headers.common.Authorization = `Bearer ${cookies['auth-app.token']}` // para usar com o common

  api.interceptors.response.use(response => {
    return response
  }, (error: AxiosError<ApiError>) => { // AxiosError<ApiError>
    if (error.response?.status === 401) {
      if (error.response.data.code === 'token.expired') {
        cookies = parseCookies(ctx)

        const { 'auth-app.refreshToken': refreshToken } = cookies
        const originalConfig = error.config as AxiosRequestConfig

        if (!isRefreshing) {
          isRefreshing = true // faz request de /refresh apenas uma vez

          api.post('/refresh', {
            refreshToken,
          }).then(response => {
            const { token } = response.data

            setCookie(ctx, 'auth-app.token', token, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/',
            })

            setCookie(ctx, 'auth-app.refreshToken', response.data.refreshToken,{
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/',
            })

            api.defaults.headers.common.Authorization = `Bearer ${token}`
            // api.defaults.headers['Authorization'] = `Bearer ${token}`

            failedRequestsQueue.forEach(request => request.onSuccess(token))
            failedRequestsQueue = []
          }).catch(err => {
            failedRequestsQueue.forEach(request => request.onFailure(err))
            failedRequestsQueue = []

            if (process.browser) {
              signOut()
            }
          }).finally(() => {
            isRefreshing = false
          })
        }

        const a: string | number | boolean = 'teste'

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers!['Authorization'] = `Bearer ${token}` // precisei adicionar o ! para tirar erro do TS
              resolve(api(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            },
          })
        })
      } else {
        // deslogar o usuário, pois foi algum erro de autenticação mas não por expiração do token
        if (process.browser) {
          signOut()
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }
    }
    
    // Aparentemente não retornar algo no interceptor dá problema de undefined nas outras requisições
    // return Promise.resolve(error.response) // só passa a response com o erro 401 para o cliente
    return Promise.reject(error)
  })

  return api
}