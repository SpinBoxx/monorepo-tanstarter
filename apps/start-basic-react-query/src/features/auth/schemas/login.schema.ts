import z from "zod";

export const loginInputSchema = z.object({
	email: z.string().email("L'email doit être valide."),
	password: z.string().min(1, "Le mot de passe est requis."),
});
