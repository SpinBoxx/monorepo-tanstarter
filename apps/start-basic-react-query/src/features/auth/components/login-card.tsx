import {
	Card,
	CardDescription,
	CardHeader,
	CardPanel,
	CardTitle,
} from "@/shared/ui/card";
import { LoginForm } from "./login-form";

export function LoginCard() {
	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>Connexion</CardTitle>
				<CardDescription>
					Accede a ton compte via le proxy serveur de l'application.
				</CardDescription>
			</CardHeader>
			<CardPanel>
				<LoginForm />
			</CardPanel>
		</Card>
	);
}
