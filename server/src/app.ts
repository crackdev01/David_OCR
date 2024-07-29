import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Secure the app by setting various HTTP headers
app.use(helmet());

// Parse incoming JSON requests with a size limit of 50MB
app.use(express.json({ limit: "50mb" }));

// Handle undefined routes with a 404 error
app.use("*", (_: express.Request, res: express.Response) =>
  res.status(404).json({ error: "Route not found" })
);

export default app;
