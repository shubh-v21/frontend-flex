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
    setTodos(todos.filter((_, index: number) => index !== indexToDelete));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-primary-light)] py-10 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 relative">
        <div className="absolute -top-4 -left-4 w-10 h-10 bg-[var(--color-primary)] rounded-lg"></div>

        <h1 className="text-3xl font-bold mb-2 text-[var(--color-primary)] text-center">
          Todo List
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Add your tasks to stay organized
        </p>

        {/* Todo Input and Button */}
        <div className="flex mb-6 gap-2 items-center">
          <input
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
            type="text"
            placeholder="Enter your todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <button
            className="bg-[var(--color-primary)] text-white py-3 px-4 rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors"
            onClick={addTodo}
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500 py-4">
              No todos yet. Add your first task!
            </p>
          ) : (
            todos.map((item, index) => (
              <div
                key={index}
                className="bg-[var(--color-primary-light)] p-4 rounded-lg border border-[var(--color-primary)]/20 flex justify-between items-center animate-fadeIn"
              >
                <span className="text-gray-800">{item}</span>
                <button
                  className="ml-4 w-8 h-8 cursor-pointer flex items-center justify-center bg-white rounded-full text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                  onClick={() => deleteTodo(index)}
                  aria-label="Delete todo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {todos.length > 0 && (
          <p className="text-gray-500 text-sm mt-4 text-center">
            You have {todos.length} item{todos.length !== 1 ? "s" : ""} in your
            list
          </p>
        )}
      </div>
    </div>
  );
};

export default Todo;
