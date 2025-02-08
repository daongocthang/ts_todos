import { Router } from "express";
import todoRouter from "./todo.routes";

const apiRouter = Router();
apiRouter.use("/todos", todoRouter);

export default apiRouter;
