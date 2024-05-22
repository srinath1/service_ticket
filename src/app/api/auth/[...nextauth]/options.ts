import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../prisma/db";
import bcrypt from "bcryptjs";

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "password",
      name: "Username and Password",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username...",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { username: credentials!.username },
        });

        if (!user) {
          return null;
        }

        const match = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (match) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      console.log("Account", account);
      console.log("useraccount", user);
      console.log("tok", token);
      if (account) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      console.log("Session", session);
      console.log("Token", token);
      if (session.user) {
        session.user.role = token.role || "USER";
      }
      return session;
    },
  },
};

export default options;
