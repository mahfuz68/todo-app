import React, { useState } from "react";
import DashboardNavbar from "../component/DashboardNavbar";
import TodoInput from "../component/TodoInput";
import TodoList from "../component/TodoList";
import "../assets/css/Dashboard.css";

export default function Dashboard() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Sample task", completed: false },
  ]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const updateTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)),
    );
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;
  const progress =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <DashboardNavbar />
      <div className="max-w-[1200px] mx-auto p-4 md:p-6">
        <div className="bg-[#0B0B0B] rounded-[24px] p-4 md:p-6">
          {/* Progress Card */}
          <div className="w-full h-[140px] rounded-[20px] p-6 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-[22px] font-semibold text-white mb-1">
                Daily Progress
              </h2>
              <p className="text-[14px] text-[#A0A0A0]">
                Keep going! You're doing great.
              </p>
            </div>
            <div className="w-[90px] h-[90px] rounded-full bg-[#FF5A3C] flex items-center justify-center">
              <span className="text-[20px] font-bold text-white">
                {completedCount}/{totalCount}
              </span>
            </div>
          </div>

          {/* Input Section */}
          <div className="mb-6">
            <TodoInput addTodo={addTodo} />
          </div>

          {/* Task List */}
          <div className="bg-[#121212] rounded-[20px] p-4 border border-white/8">
            <TodoList
              todos={todos}
              deleteTodo={deleteTodo}
              toggleComplete={toggleComplete}
              updateTodo={updateTodo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
