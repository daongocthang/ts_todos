import * as dotenv from "dotenv";
import "express-async-errors";
dotenv.config();

import cors from "cors";
import express, { Express } from "express";
import apiRouter from "./api/routes";
import dbInit from "./db";
import { errorHandler } from "./middlewares/error.middleware";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = parseInt(process.env.NODE_PORT as string) || 5000;
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

// API Routes
app.use("/api", apiRouter);

// Exception Middleware
app.use(errorHandler);

dbInit();
