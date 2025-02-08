import { Router } from "express";
import TodoController from "../controllers/todo.controller";

const todoRouter = Router();
todoRouter.post("/", TodoController.add);
todoRouter.get("/", TodoController.getAll);
todoRouter.get("/:id", TodoController.getById);
todoRouter.put("/:id", TodoController.update);
todoRouter.delete("/:id", TodoController.delete);

export default todoRouter;
