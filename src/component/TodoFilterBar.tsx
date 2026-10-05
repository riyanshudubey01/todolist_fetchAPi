import { useState } from "react";
import useCopy from "../hooks/useCopy";
import type { Todo } from "../types";

type TodoFilterBarProps = { todos: Todo[] };
type SortOrder = "asc" | "desc";
type TodoStatus = "all" | "completed" | "incomplete";

export default function TodoFilterBar({ todos }: TodoFilterBarProps) {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState<SortOrder>("asc");
    const [status, setStatus] = useState<TodoStatus>("all");
    const filteredTodos = todos
        .filter((todo) =>
            todo.title.includes(search)
        )
        .filter((todo) => {
            if (status === "all") return true;
            if (status === "completed") return todo.completed;
            if (status === "incomplete") return !todo.completed;
            return true;
        })
        .sort((a, b) => {
            if (sort === "asc") return a.title.localeCompare(b.title);
            if (sort === "desc") return b.title.localeCompare(a.title);
            return 0;
        });

        return (<>
            <h2>Todo List</h2>
            <div>
                <input
                    type="text"
                    placeholder="Search todos..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                
            </div>
            <div>
                <label>Sort by:</label>
                <select value={sort} onChange={(event) => setSort(event.target.value as SortOrder)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <div>
                <label>Status:</label>
                <select value={status} onChange={(event) => setStatus(event.target.value as TodoStatus)}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="incomplete">Incomplete</option>
                </select>
            </div>
            {filteredTodos.length === 0 ? (
                <p>No todos found.</p>
            ) : (
                <ul>
                    {filteredTodos.map((todo) => (
                            <TodoItem key={todo.id} todo={todo} />    
                    ))}
                </ul>
            )}
        </>);
}
function TodoItem({ todo }: { todo: Todo }) {
    const { copied, copy } = useCopy(todo.title);
    return (
        <>
        <span>
        {todo.title}
        </span>
        <button onClick={copy}>{copied ? "Copied!" : "Copy"}</button>
        </>)
    }