import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { fetchTodos, createTodo, updateTodo, deleteTodo, getApiUrl } from "./api";

// PUBLIC_INTERFACE
function App() {
  /** Main application component that renders the Todo UI and wires API calls. */
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const apiBase = useMemo(() => {
    // Expose the resolved API base for debugging display (not logging secrets)
    const base =
      process.env.REACT_APP_API_BASE ||
      process.env.REACT_APP_BACKEND_URL ||
      "http://localhost:3001";
    return base.replace(/\/+$/, "");
  }, []);

  // Load existing todos on mount
  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    fetchTodos(ctrl.signal)
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
        setErr("");
      })
      .catch((e) => setErr(e?.message || "Failed to load todos"))
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, []);

  const handleAdd = async (title) => {
    // Optimistic: add temp item
    const tempId = Math.floor(Math.random() * 1e9) * -1;
    const optimistic = { id: tempId, title, completed: false };
    setItems((prev) => [optimistic, ...prev]);
    try {
      const created = await createTodo({ title, completed: false });
      setItems((prev) =>
        prev.map((t) => (t.id === tempId ? created : t))
      );
    } catch (e) {
      setItems((prev) => prev.filter((t) => t.id !== tempId));
      throw e;
    }
  };

  const handleToggle = async (id, completed) => {
    // Optimistic toggle
    const snapshot = items;
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, completed } : t)));
    try {
      await updateTodo(id, { completed });
    } catch (e) {
      // revert
      setItems(snapshot);
      throw e;
    }
  };

  const handleSave = async (id, title) => {
    const snapshot = items;
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)));
    try {
      await updateTodo(id, { title });
    } catch (e) {
      setItems(snapshot);
      throw e;
    }
  };

  const handleDelete = async (id) => {
    const snapshot = items;
    setItems((prev) => prev.filter((t) => t.id !== id));
    try {
      await deleteTodo(id);
    } catch (e) {
      setItems(snapshot);
      throw e;
    }
  };

  return (
    <div className="app-shell">
      <div className="card" role="main" aria-labelledby="app-title">
        <div className="header">
          <div className="title" id="app-title">Personal Todo Manager</div>
          <span className="badge">Ocean Professional</span>
        </div>
        <div className="description">
          Create, edit, and manage your tasks. Smooth transitions, rounded corners, and subtle shadows included.
        </div>

        <TodoInput onAdd={handleAdd} />

        {err && <div className="error-text" role="alert">{err}</div>}

        {loading ? (
          <div className="empty">Loading...</div>
        ) : (
          <TodoList
            items={items}
            onToggle={handleToggle}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        )}

        <div className="footer">
          <div>Items: {items.length}</div>
          <div className="theme-note">API: {getApiUrl("/api/todos").replace("/api/todos","") || apiBase}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
