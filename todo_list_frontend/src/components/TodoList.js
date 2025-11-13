import React from "react";
import TodoItem from "./TodoItem";

/**
 * PUBLIC_INTERFACE
 * TodoList component
 * Props:
 * - items: array of todos
 * - onToggle, onSave, onDelete: handlers passed to TodoItem
 */
function TodoList({ items, onToggle, onSave, onDelete }) {
  if (!items.length) {
    return <div className="empty">No todos yet. Add one to get started.</div>;
  }
  return (
    <ul className="todo-list" aria-label="Todo list">
      {items.map((t) => (
        <TodoItem
          key={t.id}
          item={t}
          onToggle={onToggle}
          onSave={onSave}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;
