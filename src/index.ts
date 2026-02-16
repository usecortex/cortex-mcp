#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createCortexServer } from "./server.js";

const CORTEX_API_KEY = process.env.CORTEX_API_KEY;
if (!CORTEX_API_KEY) {
	console.error(
		"Error: CORTEX_API_KEY environment variable is required",
	);
	process.exit(1);
}

const CORTEX_TENANT_ID = process.env.CORTEX_TENANT_ID;
if (!CORTEX_TENANT_ID) {
	console.error(
		"Error: CORTEX_TENANT_ID environment variable is required",
	);
	process.exit(1);
}

async function main() {
	try {
		const server = createCortexServer();
		const transport = new StdioServerTransport();
		await server.connect(transport);
	} catch (error) {
		console.error("Fatal error running server:", error);
		process.exit(1);
	}
}

main().catch((error) => {
	console.error("Fatal error running server:", error);
	process.exit(1);
});
