"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
const loginSchema = z.object({
	email: z.string(),
	password: z.string(),
});
type FormFields = z.infer<typeof loginSchema>;

const Login = () => {
	const session = useSession();

	const form = useForm<FormFields>();
	const router = useRouter();
	const onSubmit: SubmitHandler<FormFields> = async (values) => {
		await signIn("credentials", { ...values, callbackUrl: "/" });
	};
	return (
		<div className='max-w-[300px] mx-auto pt-[20px]'>
			<Form {...form}>
				<form
					className='flex flex-col items-center '
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<Input
						className='w-full mb-2'
						{...form.register("email")}
						type='text'
						placeholder='email'
					/>
					<Input
						className='w-full mb-2'
						{...form.register("password")}
						type='password'
						placeholder='password'
					/>
					<Button className='mb-2 w-full' type='submit'>
						Войти
					</Button>
				</form>
			</Form>
			<Button
				className='w-full'
				onClick={() => signIn("google", { callbackUrl: "/" })}
			>
				Войти через гугл
			</Button>
		</div>
	);
};
export default Login;
