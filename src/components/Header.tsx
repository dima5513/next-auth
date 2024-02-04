"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
	const session = useSession();
	return (
		<header className='flex justify-between items-center p-[20px]'>
			<div></div>
			{!session.data && (
				<div className='space-x-2'>
					<Button>
						<Link href='/login'>Войти</Link>
					</Button>
					<Button>
						<Link href='/register'>Зарегистрироваться</Link>
					</Button>
				</div>
			)}
			{session.data && <Button onClick={() => signOut()}>Выйти</Button>}
		</header>
	);
};

export default Header;
