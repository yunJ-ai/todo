export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export const dummyTodoList: Todo[] = [
  {
    id: "1",
    text: "Learn Vite",
    completed: false,
  },
  {
    id: "2",
    text: "Set up MSW",
    completed: false,
  },
  {
    id: "3",
    text: "Build a Todo App",
    completed: false,
  },
  {
    id: "4",
    text: "Practice Tailwind CSS",
    completed: false,
  },
  {
    id: "5",
    text: "Deploy the app",
    completed: false,
  },
];
