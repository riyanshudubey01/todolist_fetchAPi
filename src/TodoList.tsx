import useFetch from "./UseFetch";
import { Link } from "react-router-dom";
import TodoFilterBar from "./component/TodoFilterBar";
import "./Todo.css";
import { Todo } from "./types";

export default function TodoList() {
    const url = "http://localhost:8000/todoList";

    const {
        data: todos,
        setData: setTodos,
        loader,
        error
    } = useFetch<Todo[]>(url);

    function toggleTodo(id: string) {
        setTodos((currentTodos) =>
            currentTodos ? currentTodos.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            ) : null
        );
    }

    function deleteTodo(id: string) {
        fetch(`${url}/${id}`, {
            method: "DELETE"
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to delete todo");
                }

                console.log("Todo deleted");
            })
            .catch((error: unknown) => {
                console.error(error);
            });

        setTodos((currentTodos) => currentTodos?.filter((todo) => todo.id !== id) ?? null);
    }

    if (error) {
        return <h2 className="error-message">{error.message}</h2>;
    }

    if (loader) {
        return <h1 className="loading">Loading...</h1>;
    }

    return (
        <div className="todo-page">

            <h1 className="todo-heading">Todo List</h1>

            {todos && (
                <div className="filter-container">
                    <TodoFilterBar todos={todos} />
                </div>
            )}

            <div className="todo-list">

                {todos && todos.length > 0 ? (
                    todos.map((todo) => (
                        <div className="todo-item" key={todo.id}>

                            <input
                                className="todo-checkbox"
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                            />

                            <Link
                                className={`todo-title ${
                                    todo.completed ? "completed" : ""
                                }`}
                                to={`/todos/${todo.id}`}
                            >
                                {todo.title}
                            </Link>

                            <button
                                className="delete-button"
                                onClick={() => deleteTodo(todo.id)}
                            >
                                Delete
                            </button>

                        </div>
                    ))
                ) : (
                    <p className="no-todos">
                        No todos found.
                    </p>
                )}

            </div>
        </div>
    );
}

