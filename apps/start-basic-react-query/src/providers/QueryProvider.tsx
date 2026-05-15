import { QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export function QueryProvider({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	return (
		<QueryClientProvider client={router.options.context.queryClient}>
			{children}
		</QueryClientProvider>
	);
}
