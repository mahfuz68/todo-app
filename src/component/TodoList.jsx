import React, { useState } from "react";

export default function TodoList({
  todos,
  deleteTodo,
  toggleComplete,
  updateTodo,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    if (editText.trim()) {
      updateTodo(id, editText);
    }
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <ul className="space-y-3">
      {todos.length === 0 ? (
        <li className="text-center text-[#A0A0A0] py-8">
          No tasks yet. Add one above!
        </li>
      ) : (
        todos.map((todo) => (
          <li
            key={todo.id}
            className="h-[60px] rounded-[14px] bg-[#121212] border border-white/[0.08] px-4 flex items-center justify-between"
          >
            {editingId === todo.id ? (
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 bg-transparent text-white focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => saveEdit(todo.id)}
                  className="text-[#22C55E] text-sm"
                >
                  Save
                </button>
                <button onClick={cancelEdit} className="text-[#A0A0A0] text-sm">
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 flex-1">
                  <div
                    onClick={() => toggleComplete(todo.id)}
                    className={`w-4 h-4 rounded-full border-2 cursor-pointer transition-colors ${
                      todo.completed
                        ? "bg-[#22C55E] border-[#22C55E]"
                        : "border-[#FF5A3C]"
                    }`}
                  />
                  <span
                    className={`text-[16px] ${
                      todo.completed ? "line-through text-[#888]" : "text-white"
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => startEdit(todo)}
                    className="text-[#A0A0A0] hover:text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-[18px] w-[18px]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-[#A0A0A0] hover:text-red-500 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-[18px] w-[18px]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </li>
        ))
      )}
    </ul>
  );
}
