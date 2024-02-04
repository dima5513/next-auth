import prisma from "@/shared/db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
export const authOptions: AuthOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			adapter: PrismaAdapter(prisma) as AuthOptions["adapter"],

			// credentials: {
			// 	email: { label: "Email" },
			// 	username: { label: "Username" },
			// 	password: { label: "Password", type: "password" },
			// },

			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) return null;
				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});
				if (!user) return null;

				return {
					id: user.id,
					email: user.email,
					name: user.name,
					image: user.image,
				};
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		jwt: ({ token, user }) => {
			if (user) {
				return {
					...token,
					id: user.id,
				};
			}
			return token;
		},
		session: ({ session, token, user }) => {
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
				},
			};
		},
	},
};
