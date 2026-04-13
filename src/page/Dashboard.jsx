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

  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-white">
      <DashboardNavbar />
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <TodoInput addTodo={addTodo} />
          <div className="mt-4">
            <TodoList
              todos={todos}
              deleteTodo={deleteTodo}
              toggleComplete={toggleComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
