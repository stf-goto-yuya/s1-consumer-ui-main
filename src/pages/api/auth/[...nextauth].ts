import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { signOut } from 'next-auth/react'

export const authOptions = {
  secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { username, password }: any = credentials

        try {
          const pUser = await axios.post(
            `${process.env.S1_API_ENDPOINT}/auth/login`,
            {
              username,
              password,
            },
          )

          const {
            data: {
              data: { access_token, sub, s1ApiToken },
            },
          } = pUser

          const { data: s1User } = await axios.get(
            `${process.env.S1_API_ENDPOINT}/users/s1/${username}`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            },
          )

          const user = {
            id: sub,
            email: username,
            accessToken: access_token,
            s1ApiToken,
            sentinelOne: {
              ...s1User,
            },
          }

          return user
        } catch (err) {
          console.log(err)
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  callbacks: {
    session({ session, token, trigger, newSession }: any) {
      console.log('session.session', session)
      console.log('session.token', token)

      if (token && token.accessToken) {
        jwt.verify(token.accessToken, 'secretKey', (err: any, decoded: any) => {
          if (err) {
            if (err.message.includes('jwt expired')) {
              signOut()
            }
          } else {
            console.log(
              `OK: decoded.email=[${decoded.email}], name=[${decoded.name}]`,
            )
          }
        })

        session.accessToken = token.accessToken
        session.id = token.id
        session.email = token.email
        session.sentinelOne = token.sentinelOne
        session.s1ApiToken = token.s1ApiToken
      }

      if (
        token.hasOwnProperty('selectSite') &&
        !session.hasOwnProperty('selectSite') &&
        token.selectSite
      ) {
        session.selectSite = token.selectSite
      }

      return session
    },
    jwt({ token, user, trigger, session }: any) {
      console.log('session.token', token.exp)

      if (user) {
        token.accessToken = user.accessToken
        token.id = user.id
        token.email = user.email
        token.sentinelOne = user.sentinelOne
        token.s1ApiToken = user.s1ApiToken
      }

      if (trigger === 'update' && session?.selectSite) {
        token.selectSite = session.selectSite
      }

      return token
    },
  },
}

export default NextAuth(authOptions)
