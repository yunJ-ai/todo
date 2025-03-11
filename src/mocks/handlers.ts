// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

// 메모리 내에 Todo 목록을 관리하기 위한 Map
const todos = new Map<string, Todo>([
  ["1", { id: "1", text: "Learn Vite", completed: false }],
  ["2", { id: "2", text: "Set up MSW", completed: false }],
  ["3", { id: "3", text: "Build a Todo App", completed: true }],
  ["4", { id: "4", text: "Practice Tailwind CSS", completed: false }],
  ["5", { id: "5", text: "Deploy the app", completed: false }],
]);

export const handlers = [
  // GET /todos - 모든 Todo 목록 반환
  http.get("/todos", () => {
    return HttpResponse.json(Array.from(todos.values()));
  }),

  // POST /todos - 새 Todo 생성
  http.post("/todos", async ({ request }) => {
    const newTodo: Partial<Todo> = (await request.json()) as Partial<Todo>;
    const id = newTodo.id ?? String(Date.now());
    const todo: Todo = { id, text: newTodo.text || "", completed: false };
    todos.set(id, todo);
    return HttpResponse.json(todo, { status: 201 });
  }),

  // PATCH /todos/:id - 기존 Todo 업데이트(예: 완료 여부 토글)
  http.patch("/todos/:id", async ({ request, params }) => {
    const id = params.id as string;
    const update: Partial<Todo> = (await request.json()) as Partial<Todo>;
    const existingTodo = todos.get(id);
    if (!existingTodo) {
      return new HttpResponse(null, { status: 404 });
    }
    const updatedTodo = { ...existingTodo, ...update };
    todos.set(id, updatedTodo);
    return HttpResponse.json(updatedTodo);
  }),

  // DELETE /todos/:id - Todo 삭제
  http.delete("/todos/:id", ({ params }) => {
    const id = params.id as string;
    const deletedTodo = todos.get(id);
    if (!deletedTodo) {
      return new HttpResponse(null, { status: 404 });
    }
    todos.delete(id);
    return HttpResponse.json(deletedTodo);
  }),
];
