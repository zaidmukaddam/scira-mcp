import { type XmcpConfig } from "xmcp";

const config: XmcpConfig = {
  http: {
    port: 3002,
    bodySizeLimit: 10 * 1024 * 1024,
    cors: {
      origin: "*",
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type"],
      exposedHeaders: ["Content-Type"],
      maxAge: 600,
    },
  },
};

export default config;
