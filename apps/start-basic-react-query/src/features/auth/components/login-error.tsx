export function LoginError({ message }: { message: string }) {
	return (
		<p
			aria-live="polite"
			className="rounded-lg border border-destructive/24 bg-destructive/8 px-3 py-2 text-destructive-foreground text-sm"
		>
			{message}
		</p>
	);
}
