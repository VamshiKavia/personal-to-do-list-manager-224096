const getApiBase = () => {
  // Prefer REACT_APP_API_BASE; fallback to REACT_APP_BACKEND_URL; default http://localhost:3001
  const base =
    process.env.REACT_APP_API_BASE ||
    process.env.REACT_APP_BACKEND_URL ||
    "http://localhost:3001";
  return base.replace(/\/+$/, ""); // remove trailing slash
};

// PUBLIC_INTERFACE
export function getApiUrl(path = "") {
  /** Return full API URL based on environment variables. */
  const base = getApiBase();
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

// PUBLIC_INTERFACE
export async function fetchTodos(signal) {
  /** Fetch all todos. */
  const res = await fetch(getApiUrl("/api/todos"), { signal });
  if (!res.ok) throw new Error(`Failed to load todos: ${res.status}`);
  return res.json();
}

// PUBLIC_INTERFACE
export async function createTodo(data) {
  /** Create a todo with optimistic UI support by returning server result. */
  const res = await fetch(getApiUrl("/api/todos"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create todo: ${res.status} ${text}`);
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function updateTodo(id, data) {
  /** Update a todo by ID. */
  const res = await fetch(getApiUrl(`/api/todos/${id}`), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update todo: ${res.status} ${text}`);
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function deleteTodo(id) {
  /** Delete a todo by ID. */
  const res = await fetch(getApiUrl(`/api/todos/${id}`), {
    method: "DELETE",
  });
  if (!res.ok && res.status !== 204) {
    const text = await res.text();
    throw new Error(`Failed to delete todo: ${res.status} ${text}`);
  }
  return true;
}
