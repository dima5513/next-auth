"use client";

import { Profile } from "@/components/Profile";
import { useSession } from "next-auth/react";

export default function Home() {
	const session = useSession();

	return <div>{session.data ? <Profile /> : <h1>Войдите</h1>}</div>;
}

