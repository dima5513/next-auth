"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<SessionProvider>
			<NextThemesProvider
				attribute='class'
				defaultTheme='dark'
				enableSystem
				disableTransitionOnChange
			>
				{children}
			</NextThemesProvider>
		</SessionProvider>
	);
};
