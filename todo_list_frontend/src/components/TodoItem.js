import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * TodoItem component
 * Props:
 * - item: {id:number, title:string, completed:boolean}
 * - onToggle: (id:number, completed:boolean) => Promise<void> | void
 * - onSave: (id:number, title:string) => Promise<void> | void
 * - onDelete: (id:number) => Promise<void> | void
 */
function TodoItem({ item, onToggle, onSave, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(item.title);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const handleToggle = async () => {
    setBusy(true);
    setErr("");
    const newVal = !item.completed;
    try {
      await onToggle(item.id, newVal);
    } catch (e) {
      setErr(e?.message || "Failed to update");
    } finally {
      setBusy(false);
    }
  };

  const handleSave = async () => {
    const trimmed = localTitle.trim();
    if (!trimmed) {
      setErr("Title cannot be empty");
      return;
    }
    setBusy(true);
    setErr("");
    try {
      await onSave(item.id, trimmed);
      setEditing(false);
    } catch (e) {
      setErr(e?.message || "Failed to save");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this todo?")) return;
    setBusy(true);
    setErr("");
    try {
      await onDelete(item.id);
    } catch (e) {
      setErr(e?.message || "Failed to delete");
      setBusy(false);
    }
  };

  return (
    <li className={`todo-item ${item.completed ? "completed" : ""}`} aria-label={`Todo item ${item.title}`}>
      <div className="left">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={handleToggle}
          disabled={busy}
          aria-label={`Mark ${item.title} as ${item.completed ? "incomplete" : "complete"}`}
        />
        {editing ? (
          <input
            className="edit-input"
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
            disabled={busy}
            aria-label="Edit title"
          />
        ) : (
          <span className="title">{item.title}</span>
        )}
      </div>
      <div className="actions">
        {editing ? (
          <>
            <button className="btn primary" onClick={handleSave} disabled={busy}>Save</button>
            <button className="btn" onClick={() => { setEditing(false); setLocalTitle(item.title); }} disabled={busy}>Cancel</button>
          </>
        ) : (
          <>
            <button className="btn" onClick={() => setEditing(true)} disabled={busy}>Edit</button>
            <button className="btn danger" onClick={handleDelete} disabled={busy}>Delete</button>
          </>
        )}
      </div>
      {err && <div className="error-text" role="alert">{err}</div>}
    </li>
  );
}

export default TodoItem;
