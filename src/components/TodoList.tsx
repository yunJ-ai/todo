import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faCheck,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type Props = {
  todoList: Todo[];
  changeCompleted: (id: string) => void;
  deleteTodo: (id: string) => Promise<void>;
  updateTodo: (id: string, nextText: string) => Promise<void>;
};

export const TodoList = ({
  todoList,
  changeCompleted,
  deleteTodo,
  updateTodo,
}: Props) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  return (
    // todolist 랜더링
    <div>
      {todoList.map((todo) => (
        <div key={todo.id} className="flex items-center gap-3 p-2">
          <label className="flex items-center gap-2 w-full">
            <input // todolist 완료 표시
              type="checkbox"
              className="w-5 h-5"
              checked={todo.completed}
              onChange={() => changeCompleted(String(todo.id))}
            />

            {/* 편집 가능한지 확인 */}
            {editingId === todo.id ? (
              <input
                type="text"
                className="px-2 py-1 w-full border border-gray-300 rounded-sm"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <span
                className={todo.completed ? "text-red-500 line-through" : ""}
              >
                {todo.text}
              </span>
            )}
          </label>

          {/* 버튼 (수정, 삭제, 수정 확인 및 취소) */}
          <div className="flex gap-2">
            {editingId === todo.id ? (
              <>
                <button
                  onClick={async () => {
                    await updateTodo(String(todo.id), editText);
                    setEditingId(null);
                  }}
                  className="hover:bg-primary-500 px-2 py-1 rounded-sm"
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="hover:bg-red-500 px-2 py-1 rounded-sm"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setEditingId(String(todo.id));
                  setEditText(todo.text);
                }}
                className="px-2 py-1 rounded-sm hover:bg-amber-500"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            )}

            <button
              onClick={() => deleteTodo(String(todo.id))}
              className="px-2 py-1 rounded-sm hover:bg-red-500"
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
