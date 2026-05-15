import { queryOptions } from "@tanstack/react-query";
import { getCurrentUser } from "../functions/user";

export const currentUserQueryOptions = queryOptions({
	queryFn: () => getCurrentUser(),
	queryKey: ["user", "current"],
	staleTime: 30_000,
});
