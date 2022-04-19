import { query as q } from "faunadb";

import NextAuth, { User } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { FaUndoAlt } from "react-icons/fa";

import { fauna } from "../../../services/fauna";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user }) {
      const { email } = user
      
      try {
        // FQL: Fauna Query Language
        
        // Minha tentativa - tentando usar abordagem de DB relacional padrão
        // Gera 2 operações no banco
        // const foundData = await fauna.query(
        //   q.Map(q.Paginate(q.Match(q.Index('users_by_email'), email)), q.Lambda('X', q.Get(q.Var('X'))))
        // ) as any
        
        // if (foundData.length) {
        //   console.log('Usuário já está salvo no banco.')
        //   return true
        // }

        await fauna.query( 
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('users_by_email'), 
                  q.Casefold(email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email }}
            ),
            q.Get( //select
              q.Match(
                q.Index('users_by_email'),
                q.Casefold(email)
              )
            )
          )
        )

        return true
      } catch {
        return false
      }
    },
  }
})