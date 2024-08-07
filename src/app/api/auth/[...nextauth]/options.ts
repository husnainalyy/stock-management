
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URL!;
const client = new MongoClient(uri);

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    pages: {
        signIn: '/auth/signIn',
    },
    callbacks: {
        async jwt({ token, user }: { token: any, user?: any }) {
            if (user) {
                await client.connect();
                const database = client.db('stock');
                const users = database.collection('users');

                // Check if the user exists
                const existingUser = await users.findOne({ email: user.email });

                if (!existingUser) {
                    await users.insertOne({
                        _id: user.id, // Use the Google user ID or any unique identifier
                        name: user.name,
                        email: user.email,
                        createdAt: new Date(),
                    });
                }

                token._id = user.id; // Set user ID in the token
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }: { session: any, token: any }) {
            session.user._id = token._id as string;
            session.user.name = token.name as string;
            session.user.email = token.email as string;
            return session;
        }
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
