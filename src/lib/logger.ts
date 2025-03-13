import winston from "winston";
import path from "path";
import fs from "fs";
import envPaths from "env-paths";

// Get XDG Base Directory paths
const paths = envPaths("sample-cli");
const logDir = path.join(paths.cache, "logs");

// Ensure log directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Create Winston logger
export const logger = winston.createLogger({
  level: "info", // Default log level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // Store logs in JSON format
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logDir, "cli.log"),
      maxsize: 5 * 1024 * 1024, // 5MB per log file
      maxFiles: 3, // Keep last 3 logs
      tailable: true // Keep appending logs
    })
  ]
});

// Prevent logs from being displayed in CLI
if (process.env.NODE_ENV !== "development") {
  logger.transports.forEach((t) => {
    if (t instanceof winston.transports.Console) {
      logger.remove(t);
    }
  });
}
