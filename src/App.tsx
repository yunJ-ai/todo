import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    fetch("/todos")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">📝 Todo List</h1>
    </div>
  );
}
