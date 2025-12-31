import { type XmcpConfig } from "xmcp";

const config: XmcpConfig = {
  http: {
    port: 3002,
    bodySizeLimit: 10 * 1024 * 1024,
    cors: {
      origin: "*",
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
      exposedHeaders: ["Content-Type", "Authorization", "x-api-key"],
      maxAge: 600,
    },
  },
  paths: {
    prompts: false,
    tools: true,
    resources: false,
  }
};

export default config;
