import { developing } from "./config";
import TodoModel from "./models/todo.model";

const dbInit = () => {
  TodoModel.sync({ alter: developing });
};

export default dbInit;
