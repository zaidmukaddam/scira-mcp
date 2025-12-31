import { z } from "zod";
import { type InferSchema } from "xmcp";
import { headers } from "xmcp/headers";

function getApiKey(headerlist: Record<string, unknown>) {
    const xApiKey = headerlist["x-api-key"];
    if (typeof xApiKey === "string" && xApiKey.trim()) return xApiKey.trim();

    const authorization = headerlist["Authorization"];
    if (typeof authorization === "string" && authorization.trim()) {
        return authorization.trim().replace(/^Bearer\s+/i, "");
    }

    return null;
}

export const schema = {
    query: z.string().describe("The query to search for"),
};

export const metadata = {
    name: "reddit",
    description: "Search Reddit for posts and discussions",
    annotations: {
        title: "Search Reddit",
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
    },
};

export default async function reddit({ query }: InferSchema<typeof schema>) {
    const headerlist = headers();
    const apiKey = getApiKey(headerlist);
    if (!apiKey) {
        return {
            content: [
                {
                    type: "text",
                    text: "Missing API key. Provide request header `x-api-key` (recommended) or `Authorization: Bearer <key>`.",
                },
            ],
        };
    }

    const response = await fetch(`https://api.scira.ai/api/reddit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
        },
        body: JSON.stringify({ query }),
    });

    if (!response.ok) {
        return {
            content: [{ type: "text", text: `Error: ${response.status} ${response.statusText}` }],
        };
    }

    const data = await response.json();

    return {
        content: [
            {
                type: "text",
                text: `${data.text}\n\nSources:\n${Array.isArray(data.sources) ? data.sources.join("\n") : ""}`,
            },
        ],
    };
}

