import { useState, useEffect, useMemo } from "react";
import { dummyTodoList } from "../data/Data";
import { TodoList } from "../components/TodoList";
import Search from "../components/Search";
import Button from "../components/Button";
import Input from "../components/Input";
import Chip from "../components/Chip";

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
        throw new Error("호출 실패");
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
  const updateTodo = async (id: string, nextText: string) => {
    try {
      const response = await fetch(`/todos/${id}`, {
        body: JSON.stringify({ text: nextText }),
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("수정 실패");
      }

      const updatedTodo = await response.json();

      setTodoList((prevTodoList) =>
        prevTodoList.map((todo) =>
          todo.id === id ? { ...todo, text: updatedTodo.text } : todo
        )
      );
    } catch (error) {
      console.error("수정 요청 실패:", error);
    }
  };

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
      console.error("삭제 요청 실패:", error);
    }
  };

  // 필터 기능

  return (
    <div className="rounded-sm flex py-4 px-2 w-screen h-screen">
      <div className="w-1/3 p-2">
        캘린더 자리
        {/* <Calendar /> */}
      </div>

      {/* TODO: 오늘의 투두 옆에 SEARCH | TodoList 목록, Search 목록 모두 묶어주기(둥근네모로-게시판 느낌) | 검색하면 해당 부분 밑에 나오기기 */}
      <div className="w-2/3 p-2">
        <p className="py-2 text-white">전체 투두 (총 : {totalTodos})</p>
        <div className="flex items-center py-2">
          <Search
            value={searchText} // 현재 검색어 상태 반영
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="items-center bg-deepblue text-white rounded-sm px-2 py-2">
          <p className="py-2">
            해야하는 투두 ({remainTodos} / ✅ 완료 : {completeTodos})
          </p>
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Button onClick={() => addTodo(inputText)} label="추가" />

          {/* TODO: 칩으로 전체, 미완료, 완료 투두 필터 기능 */}
          <div className="mt-4">
            <Chip onClick={() => setTodoList(dummyTodoList)} label="전체" />

            <Chip
              onClick={() =>
                setTodoList(dummyTodoList.filter((todo) => !todo.completed))
              }
              label="미완료"
            />
            <Chip
              onClick={() =>
                setTodoList(todoList.filter((todo) => todo.completed))
              }
              label="완료"
            />
          </div>

          <div className="mt-4 text-center">
            {filteredTodoList.length === 0 ? (
              "검색된 결과가 없습니다"
            ) : (
              <TodoList
                todoList={filteredTodoList}
                changeCompleted={changeCompleted}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoPage;
