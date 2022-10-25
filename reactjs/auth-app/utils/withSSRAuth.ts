import { destroyCookie } from 'nookies';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies } from 'nookies';
import { AuthTokenError } from '../services/errors/AuthTokenError';
import decode from "jwt-decode";
import { validadeUserPermissions } from './validadeUserPermissions';

type WithSSRAuthOptions = {
  permissions: string[]
  roles: string[]
}

type User = { 
  permissions: string[]
  roles: string[]
}

export function withSSRAuth<P extends {[k: string]: any}>(
  fn: GetServerSideProps<P>,
  options?: WithSSRAuthOptions,
) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P> | undefined> => {
    const cookies = parseCookies(ctx)
    const token = cookies['auth-app.token']
    
    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false 
        }
      }
    }

    if (options) {
      const user = decode<User>(token)
      const { permissions, roles } = options
      
      const userHasValidPermissions = validadeUserPermissions({
        user,
        permissions,
        roles,
      })

      if (!userHasValidPermissions) {
        return {
          // notFound: true, // Caso queira exibir um 404
          redirect: {
            destination: '/dashboard',
            permanent: false
          }
        }
      }
    }
    
    

    try {
      return await fn(ctx)
    } catch (error) {
      if (error instanceof AuthTokenError) {
    
        destroyCookie(ctx, 'auth-app.token')
        destroyCookie(ctx, 'auth-app.refreshToken')
  
        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    }
  }
  
  
}