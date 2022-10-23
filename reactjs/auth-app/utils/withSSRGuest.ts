import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies } from 'nookies';
/**
 * Função será usada em páginas que só podem ser acessadas por visitantes
 */

export function withSSRGuest<P extends {[k: string]: any}>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)
    
    if (cookies['auth-app.token']) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false 
        }
      }
    }

    return await fn(ctx)
  }
  
  
}