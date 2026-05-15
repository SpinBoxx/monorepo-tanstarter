import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

type LoginFieldProps = {
	autoComplete: string;
	error?: string;
	id: string;
	label: string;
	name: string;
	required?: boolean;
	type: "email" | "password";
};

export function LoginField({
	autoComplete,
	error,
	id,
	label,
	name,
	required = true,
	type,
}: LoginFieldProps) {
	const errorId = `${id}-error`;

	return (
		<div className="grid gap-2">
			<Label htmlFor={id}>{label}</Label>
			<Input
				aria-describedby={error ? errorId : undefined}
				aria-invalid={error ? true : undefined}
				autoComplete={autoComplete}
				id={id}
				name={name}
				nativeInput
				required={required}
				type={type}
			/>
			{error && (
				<p className="text-destructive-foreground text-sm" id={errorId}>
					{error}
				</p>
			)}
		</div>
	);
}
