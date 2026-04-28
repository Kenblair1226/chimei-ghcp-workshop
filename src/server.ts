import app from "./app";

const PORT = process.env.PORT || 3000;
const SHUTDOWN_TIMEOUT_MS = 10000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

function gracefulShutdown(signal: string, exitCode: number): void {
  console.log(`${signal} received. Shutting down gracefully...`);
  const forceExit = setTimeout(() => {
    console.error("Graceful shutdown timed out. Forcing exit.");
    process.exit(exitCode);
  }, SHUTDOWN_TIMEOUT_MS);
  forceExit.unref();
  server.close(() => {
    console.log("Server closed.");
    process.exit(exitCode);
  });
}

// Graceful shutdown on SIGTERM (e.g. container stop)
process.on("SIGTERM", () => gracefulShutdown("SIGTERM", 0));

// Graceful shutdown on SIGINT (e.g. Ctrl+C)
process.on("SIGINT", () => gracefulShutdown("SIGINT", 0));

// Prevent process crash on unhandled promise rejections
process.on("unhandledRejection", (reason: unknown) => {
  console.error("Unhandled promise rejection:", reason);
});

// Prevent process crash on uncaught exceptions
process.on("uncaughtException", (err: Error) => {
  console.error("Uncaught exception:", { message: err.message, stack: err.stack });
  gracefulShutdown("uncaughtException", 1);
});
