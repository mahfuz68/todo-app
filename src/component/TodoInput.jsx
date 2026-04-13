import React, { useState } from "react";

export default function TodoInput({ addTodo }) {
  const [todo, setTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim()) {
      addTodo(todo);
      setTodo("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-white focus:outline-none focus:border-indigo-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-indigo-500 hover:to-purple-500"
      >
        Add
      </button>
    </form>
  );
}
