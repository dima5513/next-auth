import { prisma } from "@/shared/db/prisma";

type CreateUser = {
	name: string;
	email: string;
	password: string;
};

export class UserRepository {
	async create(user: CreateUser) {
		await prisma.user.create({
			data: {
				email: user.email,
				name: user.name,
				password: user.password,
			},
		});
	}
}

export const userRepository = new UserRepository();
