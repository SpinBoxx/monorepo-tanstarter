import { createFileRoute } from "@tanstack/react-router";
import { LoginCard } from "@/features/auth/components/login-card";
import { ProfileCard } from "@/features/user/components/profile-card";
import { currentUserQueryOptions } from "@/features/user/queries/current-user.query";

export const Route = createFileRoute("/")({
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(currentUserQueryOptions);
	},
	component: Home,
});

function Home() {
	return (
		<div className="grid gap-6 p-6">
			<section className="grid gap-2">
				<h1 className="font-semibold text-2xl text-balance">Welcome Home</h1>
				<p className="max-w-2xl text-muted-foreground text-pretty">
					Le profil ci-dessous est charge via une server function TanStack
					Start, jamais directement depuis l'URL API dans le navigateur.
				</p>
				<LoginCard />
				<ProfileCard />
			</section>
		</div>
	);
}
