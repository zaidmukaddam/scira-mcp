import { z } from "zod";
import { type InferSchema } from "xmcp";
import { headers } from "xmcp/headers";

export const schema = {
    query: z.string().describe("The query to search for"),
};

export const metadata = {
    name: "search",
    description: "Search the web for information",
    annotations: {
        title: "Search the web for information",
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
    },
};

export default async function search({ query }: InferSchema<typeof schema>) {
    const headerlist = headers();
    console.log(headerlist)
    console.log(headerlist["x-api-key"])
    console.log(headerlist["Authorization"])
    const apiKey = headerlist["x-api-key"] || (headerlist["Authorization"] as string).replace("Bearer ", "") as string;
    console.log(apiKey)
 


    const response = await fetch(`https://api.scira.ai/api/search`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey as string,
        },
        body: JSON.stringify({
            messages: [
                { role: "user", content: query }
            ]
        })
    })

    const data = await response.json();

    console.log(data)

    return {
        content: [
            { type: "text", text: data.text + "\n\nSources:\n" + data.sources.map((source: string) => source) }
        ],
    };
}