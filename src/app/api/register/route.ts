import prisma from "@/shared/db/prisma";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
	const { email, password, name } = await request.json();

	try {
		const existingUser = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		if (existingUser)
			return NextResponse.json(
				{
					message: "Такой пользователь уже существует!",
				},
				{ status: 400 }
			);
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password,
			},
		});
		return NextResponse.json(user, { status: 201 });
	} catch (e) {
		return NextResponse.json({ error: e.message }, { status: 500 });
	}
}

export async function GET(request: NextRequest) {
	redirect("/");
}
