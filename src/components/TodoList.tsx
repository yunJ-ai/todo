import { Todo } from "../types/todo";

type Props = {
  todoList: Todo[];
  changeCompleted: (id: number) => void;
};

export const TodoList = ({ todoList, changeCompleted }: Props) => {
  return (
    <div>
      {todoList.map((todo) => (
        <p key={todo.id} className="flex items-center gap-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-5 h-5"
              checked={todo.completed}
              onChange={() => changeCompleted(Number(todo.id))}
            />
            <span className={todo.completed ? "text-red-300 line-through" : ""}>
              {todo.text}
            </span>
          </label>
        </p>
      ))}
    </div>
  );
};
