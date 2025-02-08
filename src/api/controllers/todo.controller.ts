import { log } from "console";
import { Request, Response } from "express";
import TodoService, { IndexError } from "../../db/services/todo.service";
import { BadRequestError } from "../../middlewares/error.middleware";

export default class TodoController {
  public static add = async (req: Request, res: Response) => {
    const body = req.body;

    if (!body) {
      throw new BadRequestError("Todo not found");
    }

    const todo = await TodoService.add(body);
    return res.status(200).send(todo);
  };
  public static getAll = async (req: Request, res: Response) => {
    return res.status(200).send(await TodoService.getAll());
  };

  public static getById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      IndexError.raise();
    }

    const todo = await TodoService.getById(id);
    log(todo);
    return res.status(200).send(todo);
  };

  public static update = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    log(id);
    if (isNaN(id)) {
      IndexError.raise();
    }

    const body = req.body;
    if (!body) {
      throw new BadRequestError("Todo not found");
    }

    return res.status(200).send(await TodoService.update(id, body));
  };
  public static delete = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      IndexError.raise();
    }

    return res.status(200).send({ resultOK: await TodoService.delete(id) });
  };
}
