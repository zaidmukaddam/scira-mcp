import { z } from "zod";
import { type InferSchema } from "xmcp";
import { headers } from "xmcp/headers";

export const schema = {
    query: z.string().describe("The query to search for"),
    username: z.string().describe("The username to search for").optional(),
};

export const metadata = {
    name: "xsearch",
    description: "Search for posts on X platform",
    annotations: {
        title: "Search for posts on X platform",
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
    },
};

export default async function xsearch({ query, username }: InferSchema<typeof schema>) {
    const headerlist = headers();
    const apiKey = headerlist["x-api-key"] || (headerlist["Authorization"] as string).replace("Bearer ", "") as string;


    const response = await fetch(`https://api.scira.ai/api/xsearch`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey as string,
        },
        body: JSON.stringify({
            query: query,
            username: username
        })
    })

    const data = await response.json();

    console.log(data)

    return {
        content: [
            { type: "text", text: data.text + "\n\nSources:\n" + data.sources.map((source: any) => `${source}\n`) }
        ],
    };
}