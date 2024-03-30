import bcrypt from "bcrypt"
import NextAuth, { NextAuthOptions, DefaultSession, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { Role } from "@prisma/client"
import prisma from "@/lib/db"
import { authOptions } from "./options"


declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
      // ...other properties
      role: Role;
    } & DefaultSession["user"];
  }

}



const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };