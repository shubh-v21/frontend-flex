import { useState } from "react";

const Todo = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);

  const addTodo = () => {
    if (todo.trim() === "") return; // Prevent adding empty todos
    setTodos([...todos, todo]);
    setTodo(""); // Clear input field after adding
  };

  // ⬇️ Update: deleteTodo now takes an index
  const deleteTodo = (indexToDelete: number) => {
    setTodos(todos.filter((_, index:number) => index !== indexToDelete));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-2">Todo List</h1>
      <p className="text-gray-500 mb-4">Add your todos below</p>

      {/* Todo Input and Button */}
      <div className="flex flex-col mb-4 items-center">
        <input
          className="border-2 rounded-2xl p-3 mb-4"
          type="text"
          placeholder="Enter your todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          autoFocus
        />
        <button
          className="bg-gray-100 p-2 border-2 border-black rounded-2xl"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>

      {/* Todo List */}
      <div>
        {todos.map((item, index) => (
          <div
            key={index}
            className="bg-red-200 m-2 p-2 border-2 rounded-2xl border-red-400 flex justify-between min-w-[250px]"
          >
            <span>{item}</span>
            <span
              className="ml-4 text-red-600 font-bold cursor-pointer"
              onClick={() => deleteTodo(index)}
            >
              ✖
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
