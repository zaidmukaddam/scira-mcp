import { z } from "zod";
import { type InferSchema } from "xmcp";
import { headers } from "xmcp/headers";

export const schema = {
    query: z.string().describe("The query to search for"),
};

export const metadata = {
    name: "people",
    description: "Search for people",
    annotations: {
        title: "Search for people",
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,   
    },
};

export default async function peopleSearch({ query }: InferSchema<typeof schema>) {
    const headerlist = headers();
    const apiKey = headerlist["x-api-key"] || (headerlist["Authorization"] as string).replace("Bearer ", "") as string;


    const response = await fetch(`https://api.scira.ai/api/people`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey as string,
        },
        body: JSON.stringify({
            query: query
        })
    })

    if (!response.ok) {
        return {
            content: [
                { type: "text", text: "Error: " + response.statusText }
            ],
        };
    }

    const data = await response.json();

    console.log(data)

    if (data.error) {
        return {
            content: [
                { type: "text", text: "Error: " + data.error }
            ],
        };
    }

    const profile = data.profile.name + "\n" + data.profile.x + "\n" + data.profile.linkedin + "\n" + data.profile.github + "\n" + data.profile.website + "\n" + data.profile.bio

    return {
        content: [
            { type: "text", text: profile }
        ],
    };
}