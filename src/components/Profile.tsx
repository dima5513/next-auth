"use client";
import { useSession } from "next-auth/react";

export const Profile = ({}) => {
	const session = useSession();
	return (
		<div className='max-w-[300px] mx-auto'>
			<div>
				<span>photo: </span>
				<img src={session.data?.user?.image} alt='' />
			</div>
			<p>username: {session.data?.user?.name}</p>
			<p>email: {session.data?.user?.email}</p>
		</div>
	);
};
