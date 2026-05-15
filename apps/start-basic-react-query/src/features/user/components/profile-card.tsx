"use client";

import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/shared/ui/button";
import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
	CardPanel,
	CardTitle,
} from "@/shared/ui/card";
import { currentUserQueryOptions } from "../queries/current-user.query";
import { logout } from "@/features/auth/functions/logout/logout";


export function ProfileCard() {
	const queryClient = useQueryClient();
	const logoutFn = useServerFn(logout);
	const { data: user } = useSuspenseQuery(currentUserQueryOptions);
	const logoutMutation = useMutation({
		mutationFn: () => logoutFn(),
		onSuccess: () => {
			queryClient.setQueryData(currentUserQueryOptions.queryKey, null);
		},
	});

	if (!user) {
		return (
			<Card className="w-full max-w-xl">
				<CardHeader>
					<CardTitle>Profil</CardTitle>
					<CardDescription>
						Connecte-toi pour afficher les informations de l'utilisateur
						courant.
					</CardDescription>
					<CardAction>
						<Link
							className={cn(buttonVariants({ variant: "default" }))}
							to="/login"
						>
							Se connecter
						</Link>
					</CardAction>
				</CardHeader>
			</Card>
		);
	}

	return (
		<Card className="w-full max-w-xl">
			<CardHeader>
				<CardTitle>Profil courant</CardTitle>
				<CardDescription>{user.email}</CardDescription>
				<CardAction>
					<Button
						loading={logoutMutation.isPending}
						onClick={() => logoutMutation.mutate()}
						variant="outline"
					>
						Deconnexion
					</Button>
				</CardAction>
			</CardHeader>
			<CardPanel>
				<div className="flex items-center gap-4">
					<div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-secondary font-semibold text-secondary-foreground text-xl">
						{user.initials}
					</div>
					<dl className="grid gap-1 text-sm">
						<div className="flex gap-2">
							<dt className="text-muted-foreground">Nom</dt>
							<dd className="font-medium">
								{user.fullName ?? "Non renseigne"}
							</dd>
						</div>
						<div className="flex gap-2">
							<dt className="text-muted-foreground">Identifiant</dt>
							<dd className="font-medium tabular-nums">{user.id}</dd>
						</div>
					</dl>
				</div>
			</CardPanel>
		</Card>
	);
}
