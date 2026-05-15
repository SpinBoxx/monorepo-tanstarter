"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { login } from "@/features/auth/functions/auth";
import { getAuthErrorMessage } from "@/features/auth/functions/auth.utils";
import type { LoginCredentials } from "@/features/auth/types/auth";
import { currentUserQueryOptions } from "@/features/user/queries/current-user.query";
import { Button } from "@/shared/ui/button";
import { LoginError } from "./login-error";
import { LoginField } from "./login-field";

export function LoginForm() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const loginFn = useServerFn(login);
	const loginMutation = useMutation({
		mutationFn: (credentials: LoginCredentials) =>
			loginFn({ data: credentials }),
		onSuccess: async (session) => {
			queryClient.setQueryData(currentUserQueryOptions.queryKey, session.user);
			await navigate({ to: "/" });
		},
	});

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const credentials: LoginCredentials = {
			email: String(formData.get("email") ?? ""),
			password: String(formData.get("password") ?? ""),
		};
		loginMutation.mutate(credentials);
	}

	const errorMessage = loginMutation.isError
		? getAuthErrorMessage(loginMutation.error)
		: null;

	return (
		<form className="grid gap-4" onSubmit={handleSubmit}>
			<LoginField
				autoComplete="email"
				id="login-email"
				label="Email"
				name="email"
				type="email"
			/>
			<LoginField
				autoComplete="current-password"
				id="login-password"
				label="Mot de passe"
				name="password"
				type="password"
			/>
			{errorMessage && <LoginError message={errorMessage} />}
			<Button loading={loginMutation.isPending} type="submit">
				Se connecter
			</Button>
		</form>
	);
}
