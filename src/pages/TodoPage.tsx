import { useEffect, useState } from "react";
import { dummyTodoList } from "../data/Data";
import { TodoList } from "../components/TodoList";
import Search from "../components/Search";
import Button from "../components/Button";
import Calendar from "../components/Calendar";
import Inputs from "../components/Input";

function TodoPage() {
  const [todoList, setTodoList] = useState(dummyTodoList);
  const [searchText, setSearchText] = useState("");
  const [inputText, setInputText] = useState("");

  // /todos 엔드포인트로부터 데이터를 가져와 상태를 업데이트
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

  // API를 통해 새로운 TODO 항목을 추가하는 함수
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

  const changeCompleted = (id: number) => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((todo) =>
        todo.id === id.toString()
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  return (
    <div className="py-4 px-2">
      <h3>list</h3>
      <div className="bg-gray-850 rounded-sm flex text-white">
        <div className="w-1/3 p-2">
          <Calendar />
        </div>
        <div className="w-2/3 p-2 flex flex-col">
          <p className="py-2">오늘의 투두</p>
          <div className="flex items-center py-2">
            <Search
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <Inputs
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <Button onClick={() => addTodo(inputText)} label="추가" />
          </div>
          <div className="mt-4">
            <TodoList todoList={todoList} changeCompleted={changeCompleted} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoPage;
