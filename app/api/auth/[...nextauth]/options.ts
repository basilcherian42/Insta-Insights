//@ts-nocheck
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const baseURL = process.env.NEXT_PUBLIC_HOSTNAME + "login";

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt", //It configures the session strategy to use JWT (JSON Web Token) for managing sessions.
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" }, // Add name field
      },
      async authorize(credentials, req) {
        const requestBody = {
          email: credentials.email,
          password: credentials.password,
          name: credentials.name, // Include name in the request body
        };
        const res = await fetch(baseURL, {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" },
        });
        const resdata = await res.json();
        console.log("Login...", resdata);
        if (
          resdata.status === 400 ||
          resdata.status === 401 ||
          resdata.status === 403 ||
          resdata.status === 500
        ) {
          return null;
        }
        if (resdata.status === 200 || resdata.status === 201) {
          return resdata;
        }
        return null;
      },
    }),
  ],
  pages: {},
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, user, token }) {
      return token;
    },
  },
  secret: process.env.JWT_SECRET,
};
