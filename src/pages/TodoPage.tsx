import { useState, useEffect } from "react";
import { TodoList } from "../components/TodoList";
import Search from "../components/Search";
import Button from "../components/Button";
import Input from "../components/Input";
import Chip from "../components/Chip";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function TodoPage() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filteredTodoList, setFilteredTodoList] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [inputText, setInputText] = useState("");

  // 할 일 목록 불러오기
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

  // 할 일 추가
  const addTodo = async (text: string) => {
    try {
      const response = await fetch("/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  // 할 일 수정 try... catch 예외처리 / throw
  const updateTodo = async (id: string, nextText: string) => {
    try {
      const response = await fetch(`/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: nextText }),
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
        prevTodoList.filter((todo) => todo.id !== id)
      );
    } catch (error) {
      console.error("TODO 삭제 실패:", error);
    }
  };

  // 필터링 함수
  const filterTodos = (type: string) => {
    let filteredList = todoList;

    if (type === "all") {
      filteredList = todoList;
    } else if (type === "incomplete") {
      filteredList = todoList.filter((todo) => !todo.completed);
    } else if (type === "completed") {
      filteredList = todoList.filter((todo) => todo.completed);
    }

    // 검색 기능
    if (searchText.trim() !== "") {
      filteredList = filteredList.filter((todo) =>
        todo.text.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredTodoList(filteredList);
  };

  // todoList가 변경될 때 필터링 유지
  useEffect(() => {
    filterTodos(filterType);
  }, [todoList, filterType, searchText]);

  // todo 목록 개수 측정
  const incomplete = todoList.filter((todo) => !todo.completed).length;
  const complete = todoList.filter((todo) => todo.completed).length;

  return (
    <div className="rounded-sm flex py-4 px-2 w-screen h-screen">
      <div className="w-1/3 p-2">캘린더 자리</div>

      {/* todo 관리 */}
      <div className="w-2/3 p-2">
        <p className="py-2 text-white">전체 투두 (총 : {todoList.length})</p>
        <Search
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <div className="items-center bg-deepblue text-white rounded-sm px-2 py-2">
          <p className="py-2">
            해야하는 투두 (✖️ 미완료 : {incomplete} / ✅ 완료 : {complete})
          </p>
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Button
            onClick={async () => {
              await addTodo(inputText);
              setInputText("");
            }}
            label="추가"
          />

          {/* 필터 버튼 */}
          <div className="mt-4">
            <Chip
              label="전체"
              onClick={() => setFilterType("all")}
              active={filterType === "all"}
            />
            <Chip
              label="미완료"
              onClick={() => setFilterType("incomplete")}
              active={filterType === "incomplete"}
            />
            <Chip
              label="완료"
              onClick={() => setFilterType("completed")}
              active={filterType === "completed"}
            />
          </div>

          {/* TODO 리스트 출력 */}
          <div className="mt-4 text-center">
            {filteredTodoList.length === 0 ? (
              "검색 결과가 없습니다"
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
