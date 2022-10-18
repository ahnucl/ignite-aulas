import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'

let cookies = parseCookies()
let isRefreshing = false
let failedRequestsQueue: any[] = []

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['auth-app.token']}`
  }
})


interface ApiError {
   error: boolean,
   code: string,
   message: string
}

api.interceptors.response.use(response => {
  return response
}, (error: AxiosError) => { // AxiosError<ApiError>
  if (error?.response?.status === 401) {
    if (error.response.data?.code === 'token.expired') {
      cookies = parseCookies()

      const { 'auth-app.refreshToken': refreshToken} = cookies
      const originalConfig = error.config

      if(!isRefreshing) {
        isRefreshing = true

        api.post('/refresh', {
          refreshToken,
        }).then(response => {
          const { token } = response.data
  
          setCookie(undefined, 'auth-app.token', token, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/', // quais caminhos da aplicação terão acesso ao cookie
          })
  
          setCookie(undefined, 'auth-app.refreshToken', response.data.refreshToken,{
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/', // quais caminhos da aplicação terão acesso ao cookie
          })

          api.defaults.headers['Authorization'] = `Bearer ${token}`

          failedRequestsQueue.forEach(request => request.onSuccess(token))
          failedRequestsQueue = []
        }).catch(err => {
          failedRequestsQueue.forEach(request => request.onFailure(err))
          failedRequestsQueue = []
        }).finally(() => {
          isRefreshing = false
        })
      }

      return new Promise((resolve, reject) => {
        console.log('dentro da fila')
        failedRequestsQueue.push({
          onSuccess: (token: string) => {
            console.log('Success')
            originalConfig.headers['Authorization'] = `Bearer ${token}`
            
            resolve(api(originalConfig))
          },
          onFailure: (err: AxiosError) => {
            console.log('Failure')
            reject(err)
          },
        })
      })
    } else {
      // deslogar o usuário
    }
  }
})