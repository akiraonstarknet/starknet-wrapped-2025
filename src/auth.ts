import NextAuth from "next-auth";
import Twitter from "next-auth/providers/twitter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  basePath: "/api/auth",
  providers: [
    Twitter({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      authorization: {
        url: "https://x.com/i/oauth2/authorize",
        params: {
          scope: "users.read users.email tweet.read offline.access",
        },
      },
      userinfo: {
        url: "https://api.x.com/2/users/me?user.fields=profile_image_url",
      },
      profile(profile) {
        return {
          id: profile.data.id,
          name: profile.data.name,
          email: profile.data.email ?? null,
          image: profile.data.profile_image_url?.replace("_normal", ""),
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
});

export default auth;
