import React from "react";

export default function TodoList({ todos, deleteTodo, toggleComplete }) {
  return (
    <ul className="space-y-2">
      {todos.length === 0 ? (
        <li className="text-center text-gray-500 dark:text-gray-400 py-4">
          No tasks yet. Add one above!
        </li>
      ) : (
        todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className="w-5 h-5 text-indigo-500 focus:ring-indigo-500"
              />
              <span
                className={`${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "dark:text-white"
                }`}
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              Delete
            </button>
          </li>
        ))
      )}
    </ul>
  );
}
