import { logger } from "../lib/logger.js";

export function helloAction(name?: string) {
  logger.info({ message: "Executing hello command", name: name || "world" });
  console.log(`Hello, ${name || "world"}!`);
}
