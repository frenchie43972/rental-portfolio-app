import connectDB from '@/config/database';
import User from '@/models/User';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    })
  ],
  callbacks: {
    // Invoked on a successful sign in
    async signIn({profile}) {
      // 1. Connect to DB
      await connectDB();
      // 2. Verify user exists
      const validUser = await User.findOne({email: profile.email});
      // 3. If not, add user to DB
      if (!validUser) {
        // Truncate long usernames
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // 4. Return true to allow sign in
      return true;
    },
    // Another callback that modifies the session object
    async session({session}) {
      // 1. Get user from Db
      const user = await User.findOne({email: session.user.email});
      // 2. Assign user ID to the session
      session.user.id = user._id.toString();
      // 3. Return that session
      return session;
    },
  }
};