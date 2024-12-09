declare namespace NodeJS {
  interface ProcessEnv {
    BOT_TOKEN: string;
    MORPHER_TOKEN: string;
    NODE_ENV: "development" | "production";
  }
}
