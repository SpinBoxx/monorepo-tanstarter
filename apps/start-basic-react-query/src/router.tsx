import { dehydrate, hydrate, QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";

import { QueryProvider } from "./providers/QueryProvider";
import { routeTree } from "./routeTree.gen";
import { NotFound } from "./shared/NotFound";

function createQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				staleTime: 30_000,
			},
		},
	});
}

export function getRouter() {
	const queryClient = createQueryClient();
	const router = createRouter({
		routeTree,
		context: { queryClient },
		defaultPreload: "intent",
		// defaultErrorComponent: DefaultCatchBoundary,
		defaultNotFoundComponent: () => <NotFound />,
		dehydrate: () => ({
			queryClient: JSON.parse(JSON.stringify(dehydrate(queryClient))),
		}),
		hydrate: (data) => {
			if (data?.queryClient) {
				hydrate(queryClient, data.queryClient);
			}
		},
		InnerWrap: QueryProvider,
		scrollRestoration: true,
	});
	return router;
}
