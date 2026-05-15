export function getAuthErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	return "Une erreur inattendue est survenue.";
}