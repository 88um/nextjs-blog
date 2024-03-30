import bcrypt from "bcrypt"
import NextAuth, { NextAuthOptions, DefaultSession, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { Role } from "@prisma/client"
import prisma from "@/lib/db"
export const authOptions: NextAuthOptions = {
    callbacks:{
      async jwt({ token, user }) {
        if (user){
          // @ts-ignore
          return { ...token, id: user.id, username: user.username, role : user.role}
        }
        return token;
      },
  
      async session({ session, token,}) {
        return {
          ...session,
          user:{
            ...session.user,
            id:token.id,
            username:token.username,
            role: token.role
          }
        }
      },
    },
    adapter: PrismaAdapter(prisma),
    providers: [
      CredentialsProvider({
        name: 'credentials',
        credentials: {
          username: { label: 'username', type: 'text' },
          password: { label: 'password', type: 'password' }
        },
        async authorize(credentials) {
          if (!credentials?.username || !credentials?.password) {
            throw new Error('Invalid credentials');
          }
  
          const user = await prisma.user.findUnique({
            where: {
              username: credentials.username
            }
          }) || await prisma.user.findUnique({
            where: {
              email: credentials.username
            }
          }) ;
  
          if (!user) {
            throw new Error('Invalid credentials');
          }
  
          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );
  
          if (!isCorrectPassword) {
            throw new Error('Invalid credentials');
          }
  
          return user;
        }
      })
    ],
    
    debug: process.env.NODE_ENV === 'development',
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
  }
  