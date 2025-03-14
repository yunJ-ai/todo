import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Todo } from "../data/Data";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";

type Props = {
  todoList: Todo[];
  changeCompleted: (id: string) => void;
  deleteTodo: (id: string) => Promise<void>;
};

export const TodoList = ({ todoList, changeCompleted, deleteTodo }: Props) => {
  return (
    <div>
      {todoList.map((todo) => (
        <p key={todo.id} className="flex items-center gap-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-5 h-5"
              checked={todo.completed}
              onChange={() => changeCompleted(String(todo.id))}
            />
            <span className={todo.completed ? "text-red-300 line-through" : ""}>
              {todo.text}
            </span>
          </label>
          <div className="">
            {/* 버튼 클릭 시, 내용 수정 */}
            <button className="hover:bg-primary-500 px-2 py-2 rounded-sm">
              <FontAwesomeIcon icon={faEdit} />
            </button>
            {/* 버튼 클릭 시, 삭제 */}
            <button
              onClick={() => deleteTodo(String(todo.id))}
              className="hover:bg-red-500 px-2 py-2 rounded-sm"
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </p>
      ))}
    </div>
  );
};
