import { useState, useEffect } from 'react'
import './App.css'

const STORAGE_KEY = 'todo-tasks'

const FILTERS = [
  { value: 'all', label: 'Toutes' },
  { value: 'active', label: 'Actives' },
  { value: 'completed', label: 'Terminées' },
]

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function TodoItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)

  const startEdit = () => {
    if (task.completed) return
    setEditText(task.text)
    setEditing(true)
  }

  const saveEdit = () => {
    const text = editText.trim()
    if (text) onEdit(task.id, text)
    setEditing(false)
  }

  const cancelEdit = () => {
    setEditText(task.text)
    setEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') saveEdit()
    if (e.key === 'Escape') cancelEdit()
  }

  return (
    <li className={`todo-item ${task.completed ? 'done' : ''}`}>
      <label className="todo-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Marquer « ${task.text} » comme terminée`}
        />
        {editing ? (
          <input
            type="text"
            className="todo-edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={handleKeyDown}
            autoFocus
            aria-label="Modifier la tâche"
          />
        ) : (
          <span
            onDoubleClick={startEdit}
            title={task.completed ? undefined : 'Double-clic pour modifier'}
          >
            {task.text}
          </span>
        )}
      </label>

      {!editing && (
        <div className="todo-actions">
          {!task.completed && (
            <button
              type="button"
              className="todo-action-btn"
              onClick={startEdit}
              aria-label={`Modifier « ${task.text} »`}
            >
              ✎
            </button>
          )}
          <button
            type="button"
            className="todo-action-btn delete"
            onClick={() => onDelete(task.id)}
            aria-label={`Supprimer « ${task.text} »`}
          >
            ×
          </button>
        </div>
      )}
    </li>
  )
}

function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return

    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, completed: false },
    ])
    setInput('')
  }

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const editTask = (id, text) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text } : task)),
    )
  }

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed))
  }

  const allCompleted = tasks.length > 0 && tasks.every((t) => t.completed)

  const toggleAll = () => {
    setTasks((prev) => prev.map((task) => ({ ...task, completed: !allCompleted })))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const remaining = tasks.filter((t) => !t.completed).length
  const completedCount = tasks.filter((t) => t.completed).length

  return (
    <div className="todo-app">
      <h1>Todo List</h1>

      <form className="todo-form" onSubmit={addTask}>
        <input
          type="text"
          className="todo-input"
          placeholder="Ajouter une tâche..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Nouvelle tâche"
        />
        <button type="submit" className="todo-add-btn">
          Ajouter
        </button>
      </form>

      <div className="todo-filters" role="group" aria-label="Filtrer les tâches">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={`filter-btn ${filter === value ? 'active' : ''}`}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {tasks.length > 0 && (
        <label className="todo-toggle-all">
          <input
            type="checkbox"
            checked={allCompleted}
            onChange={toggleAll}
            aria-label="Tout cocher ou décocher"
          />
          <span>Tout sélectionner</span>
        </label>
      )}

      <ul className="todo-list">
        {filteredTasks.length === 0 ? (
          <li className="todo-empty">
            {tasks.length === 0
              ? 'Aucune tâche — ajoutez-en une ci-dessus'
              : 'Aucune tâche à afficher pour ce filtre'}
          </li>
        ) : (
          filteredTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          ))
        )}
      </ul>

      <footer className="todo-footer">
        <p className="todo-count">
          {remaining} tâche{remaining !== 1 ? 's' : ''} restante{remaining !== 1 ? 's' : ''}
        </p>

        {completedCount > 0 && (
          <button
            type="button"
            className="todo-clear-btn"
            onClick={clearCompleted}
          >
            Effacer les terminées ({completedCount})
          </button>
        )}
      </footer>
    </div>
  )
}

export default App
