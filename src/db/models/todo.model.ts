import { CreationOptional, DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

export type TodoType = {
  id: number;
  content: string;
  completed?: boolean;
};

export type TodoUpdate = {
  content?: string;
  completed?: boolean;
};

export type TodoCreation = Optional<TodoType, "id">;

class TodoModel extends Model<TodoType, TodoCreation> implements TodoType {
  declare id: number;
  declare content: string;
  declare completed: boolean;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

TodoModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize: sequelizeConnection, tableName: "todos" }
);

export default TodoModel;
