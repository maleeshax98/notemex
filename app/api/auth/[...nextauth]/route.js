import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/libs/db";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      // console.log(user)
      if (user) {
        return {
          ...token,
          id: user.id,
          image: user.iamge,
          coverImage: user.coverImage,
          bio: user.bio,
          role: user?.role,
        };
      }

      if (trigger === "update") {
        console.log(session);
        if (session.name) {
          token.name = session.name;
        }
        if (session.coverImage) {
          token.coverImage = session.coverImage;
        }
        if (session.bio) {
          token.bio = session.bio;
        }
        if (session.image) {
          token.image = session.image;
          token.picture = session.image;
        }
      }
      return token;
    },

    async session({ session, user, token, newSession, trigger }) {
      // console.log("trigger==", trigger);

      if (trigger === "update") {
        // console.log("session=", session)
        // session.name = newSession.name;
        // session.coverImage = newSession.coverImage;
        // session.bio = newSession.bio;
        // session.image = newSession.image;

        if (newSession.name) {
          session.name = newSession.name;
        }
        if (newSession.coverImage) {
          session.coverImage = newSession.coverImage;
        }
        if (newSession.bio) {
          session.bio = newSession.bio;
        }
        if (newSession.image) {
          session.image = newSession.image;
        }
      }
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          coverImage: token.coverImage,
          bio: token.bio,
          role: user?.role,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
