import { cleanEnv, str, port, url } from "envalid";

export const envs = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ["development", "production"] }),
  PORT: port({ default: 3000 }),
  DB_URL: url({ default: "none" }),
});
