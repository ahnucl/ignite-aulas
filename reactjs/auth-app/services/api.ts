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
  
  console.log('Tem contexto na api?', !!ctx)
  console.log("cookies['auth-app.token'] no setupAPIClient", cookies['auth-app.token'])

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['auth-app.token']}`
    }
  })

  api.interceptors.response.use(response => {
    return response
  }, (error: AxiosError<ApiError>) => { // AxiosError<ApiError>
    if (error.response?.status === 401) {

      console.log('error do interceptor', error)
      if (error.response.data.code === 'token.expired') {
        cookies = parseCookies(ctx)

        const { 'auth-app.refreshToken': refreshToken } = cookies
        const originalConfig = error.config as AxiosRequestConfig

        if (!isRefreshing) {
          isRefreshing = true // faz request de /refresh apenas uma vez

          console.log('pre refresh')

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

            api.defaults.headers.common.Authorizarion = `Bearer ${token}`

            failedRequestsQueue.forEach(request => request.onSuccess(token))
            failedRequestsQueue = []
          }).catch(err => {
            failedRequestsQueue.forEach(request => request.onFailure(err))
            failedRequestsQueue = []

            console.log('api - catch')
            console.log('process.browser',process.browser)
            console.log('typeof window === undefined',typeof window === 'undefined')
            console.log('error', err)

            if (process.browser) {
              signOut()
            }
          }).finally(() => {
            isRefreshing = false
          })
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers!.Authorization = `Bearer ${token}` // precisei adicionar o ! para tirar erro do TS
              resolve(api(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            },
          })
        })
      } else {
        // deslogar o usuário, pois foi algum erro de autenticação mas não por expiração do token
        console.log('api - else')
        console.log('process.browser',process.browser)
        console.log('typeof window === undefined',typeof window === 'undefined')
        

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