import "dotenv/config";

export interface EnvConfig {
  PORT: number;
  BITBUCKET_TOKEN: string;
  LOG_LEVEL: "fatal" | "error" | "warn" | "info" | "debug" | "trace";
}

export const env: EnvConfig = {
  PORT: parseInt(process.env.PORT ?? "") ?? 5000,
  BITBUCKET_TOKEN: process.env.BITBUCKET_TOKEN ?? "",
  LOG_LEVEL: (process.env.LOG_LEVEL as EnvConfig["LOG_LEVEL"]) ?? "info",
};

if (!env.BITBUCKET_TOKEN) {
  throw new Error("BITBUCKET_TOKEN missing in your environment");
}
