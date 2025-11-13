import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * TodoInput component to add a new todo.
 * Props:
 * - onAdd: function(title: string) => Promise<void> | void
 */
function TodoInput({ onAdd }) {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError("Please enter a title.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await onAdd(trimmed);
      setTitle("");
    } catch (err) {
      setError(err?.message || "Failed to add todo");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="todo-input" onSubmit={handleSubmit} aria-label="Add todo form">
      <input
        type="text"
        className="input"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={submitting}
        aria-label="Todo title"
      />
      <button className="btn primary" type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add"}
      </button>
      {error && <div className="error-text" role="alert">{error}</div>}
    </form>
  );
}

export default TodoInput;
