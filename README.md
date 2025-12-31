# Scira AI MCP Server

A Model Context Protocol (MCP) server that provides AI-powered search capabilities through the Scira AI platform. This server offers three specialized search tools for comprehensive information retrieval.

## Features

This MCP server provides the following tools:

### 🔍 Web Search (`search`)
- **Description**: Search the web for comprehensive information
- **Use Case**: Get real-time web search results with AI-powered analysis
- **Returns**: Structured search results with sources

### 👥 People Search (`people`)
- **Description**: Search for detailed people profiles and information
- **Use Case**: Find professional profiles, social media, and biographical data
- **Returns**: Name, social profiles (X, LinkedIn, GitHub), website, and bio

### 🐦 X Platform Search (`xsearch`)
- **Description**: Search for posts and content on X (formerly Twitter)
- **Use Case**: Find relevant tweets, discussions, and social media content
- **Parameters**: Query string and optional username filter
- **Returns**: X posts and content with sources

### 👽 Reddit Search (`reddit`)
- **Description**: Search Reddit for posts and discussions
- **Use Case**: Find relevant Reddit threads, advice, and community discussions
- **Returns**: AI-powered summary with sources

Example:

```bash
curl -X POST https://api.scira.ai/api/reddit \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "query": "Best practices for deploying Next.js on Vercel?"
  }'
```

## Prerequisites

- Node.js 20.0.0 or higher
- A valid Scira AI API key

# How to use the MCP server

1. Put the MCP server url: https://mcp.scira.ai/mcp
2. Get the API Key from the Scira AI Platform(https://api.scira.ai)
3. Put the API Key in the MCP server config with the key `x-api-key`:
  ```json
  {
    "x-api-key": "your-api-key"
  }
  ```

4. You can use the MCP server in your Scira AI MCP client(https://mcpchat.scira.ai)


## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up your Scira AI API key (the server expects it via `x-api-key` header or `Authorization: Bearer <token>`)

## Development

Run the development server:

```bash
pnpm dev
```

This starts the MCP server in development mode with hot reloading.

## Building for Production

Build the project:

```bash
pnpm build
```

## Running in Production

Start the HTTP server:

```bash
pnpm start
```

The server will run on port 3002 by default (configurable in `xmcp.config.ts`).

## Configuration

The server is configured via `xmcp.config.ts` with the following defaults:
- **Port**: 3002
- **CORS**: Enabled for all origins
- **Body Size Limit**: 10MB

## API Authentication

All tools require authentication through the Scira AI API. The server accepts API keys via:
- `x-api-key` header
- `Authorization: Bearer <token>` header

## Architecture

This project uses the xmcp framework with automatic tool discovery. Each tool is defined in the `src/tools/` directory with:
- **Schema**: Zod-based parameter validation
- **Metadata**: Tool description and annotations
- **Implementation**: Async function that calls Scira AI APIs

## Learn More

- [xmcp Documentation](https://xmcp.dev/docs)
- [Scira AI Platform](https://api.scira.ai)
