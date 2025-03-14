import { useState, useEffect, useMemo } from "react";
import { dummyTodoList } from "../data/Data";
import { TodoList } from "../components/TodoList";
import Search from "../components/Search";
import Button from "../components/Button";
import Inputs from "../components/Input";

function TodoPage() {
  const [todoList, setTodoList] = useState(dummyTodoList);
  const [searchText, setSearchText] = useState("");
  const [inputText, setInputText] = useState("");

  // /todos 할 일 목록 불러오기기
  useEffect(() => {
    fetch("/todos")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodoList(data);
      })
      .catch((error) =>
        console.error("TODO 데이터를 가져오는 중 오류 발생:", error)
      );
  }, []);

  // 할 일 추가(addTodo)
  const addTodo = async (text: string) => {
    try {
      const response = await fetch("/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, completed: false }),
      });
      if (!response.ok) {
        throw new Error("API 호출 실패");
      }
      const newTodo = await response.json();
      setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
    } catch (error) {
      console.error("새로운 TODO 추가 실패:", error);
    }
  };

  // 할 일 완료 상태 변경
  const changeCompleted = (id: string) => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 해야할 일, 완료한 일 계산
  const totalTodos = todoList.length;
  const completeTodos = useMemo(
    () => todoList.filter((todo) => todo.completed).length,
    [todoList]
  );
  const remainTodos = useMemo(
    () => totalTodos - completeTodos,
    [totalTodos, completeTodos]
  );

  // 검색 기능
  const filteredTodoList = todoList.filter((todo) =>
    todo.text.toLowerCase().includes(searchText.toLowerCase())
  );

  // 할 일 수정

  // 할 일 삭제
  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("삭제 실패");
      }
      setTodoList((prevTodoList) =>
        prevTodoList.filter((todo) => String(todo.id) !== id)
      );
    } catch (error) {
      console.error("DELETE 요청 실패:", error);
    }
  };

  return (
    <div className="bg-gray-850 rounded-sm flex text-white py-4 px-2 w-screen h-screen">
      {/* <div className="w-1/3 p-2">
        <Calendar />
      </div> */}
      {/* TODO : 오늘의 투두 옆에 SEARCH | TodoList 목록, Search 목록 모두 묶어주기(둥근네모로-게시판 느낌) | 검색하면 해당 부분 밑에 나오기기 */}
      <div className="w-2/3 p-2">
        <p className="py-2">전체 투두 (총 : {totalTodos})</p>
        <div className="flex items-center py-2">
          <Search
            value={searchText} // 현재 검색어 상태 반영
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="items-center">
          <p className="py-2">
            해야하는 투두 ({remainTodos} / 완료 : {completeTodos})
          </p>
          <Inputs
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Button onClick={() => addTodo(inputText)} label="추가" />
        </div>
        <div className="mt-4">
          {filteredTodoList.length === 0 ? (
            "검색된 결과가 없습니다"
          ) : (
            <TodoList
              todoList={filteredTodoList}
              changeCompleted={changeCompleted}
              deleteTodo={deleteTodo}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoPage;
