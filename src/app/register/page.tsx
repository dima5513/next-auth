"use client";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import * as z from "zod";

const formSchema = z.object({
	email: z.string().nonempty(),
	name: z.string(),
	password: z.string(),
});
type FormFields = z.infer<typeof formSchema>;

export default function Register() {
	const router = useRouter();

	const form = useForm<FormFields>();

	const onSubmit: SubmitHandler<FormFields> = async (values) => {
		const response = await fetch("http://localhost:3000/api/register", {
			method: "POST",
			body: JSON.stringify(values),
		});
		console.log(await response.json());
		console.log(response.ok);
		if (response.ok) router.push("/");
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col space-y-2 max-w-[300px] mx-auto pt-[20px]'
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>

							<FormControl>
								<Input
									// {...form.register("email")}
									{...field}
									type='text'
									// name='name'
									className='border-2 '
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									// {...form.register("email")}
									{...field}
									type='text'
									// name='email'
									className='border-2 '
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					// control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									// {...form.register("name")}
									{...field}
									type='text'
									// name='password'
									className='border-2 '
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				{/* <Input
					{...form.register("name")}
					type='text'
					name='name'
					className='border-2 '
				/>

				<Input
					{...form.register("password")}
					type='password'
					name='password'
					className='border-2 '
				/> */}
				<Button type='submit'>Зарегаться</Button>
			</form>
		</Form>
	);
}
