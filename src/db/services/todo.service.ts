import moment from "moment";
import { BadRequestError } from "../../middlewares/error.middleware";
import TodoModel, { TodoType, TodoUpdate } from "../models/todo.model";

const dateFormat = "YYYY-MM-DD HH:mm:ss";

export class IndexError {
  public static raise() {
    throw new BadRequestError("Index is not available");
  }
}

export type Todo = {
  id: number;
  content: string;
  completed?: boolean;
  createdAt: string;
  updatedAt: string;
};

export default class TodoService {
  public static async add(payload: TodoType): Promise<Todo> {
    const model = await TodoModel.create(payload);
    return this.toValues(model);
  }
  public static async getAll(): Promise<Todo[]> {
    const modelList = await TodoModel.findAll();
    return modelList.map((t) => this.toValues(t));
  }
  public static async getById(id: number): Promise<Todo | null> {
    const model = await TodoModel.findByPk(id);
    if (model instanceof TodoModel) return this.toValues(model);
    return null;
  }
  public static async update(id: number, payload: TodoUpdate): Promise<Todo> {
    const todo = await TodoModel.findByPk(id);
    if (!(todo instanceof TodoModel)) {
      IndexError.raise();
    }
    const model = await (todo as TodoModel).update(payload);
    return this.toValues(model);
  }
  public static async delete(id: number): Promise<boolean> {
    const count = await TodoModel.destroy({ where: { id } });
    return !!count;
  }

  private static toValues(model: TodoModel): Todo {
    return {
      ...model.dataValues,
      createdAt: moment(model.createdAt).format(dateFormat),
      updatedAt: moment(model.updatedAt).format(dateFormat),
    };
  }
}
