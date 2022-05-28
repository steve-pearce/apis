import errorHandler from "errorhandler";
import app from "./app";

/**
 * Error Handler. Provides full stack
 */
if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
}

/**
 * Start Express server.
 */
// Express configuration
const portNumber = Number(process.env.PORT || "3000");
const server = app.listen(portNumber, () => {
  console.log(
    "portNumber App is running at http://localhost:%d in %s mode",
    portNumber,
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;
