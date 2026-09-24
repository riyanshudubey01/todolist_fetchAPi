import { Link, useNavigate } from "react-router-dom";
import "../HomePage.css";
import { useState } from "react";

export default function HomePage() {
    const [todoId, setTodoId] = useState("");
    const navigate = useNavigate();

    function handleMove() {
        if (todoId.trim() === "") {
            return;
        }

        navigate(`/todos/${todoId}`);
    }

    return (
        <div className="home-container">

            <div className="home-card">
                <h1>Welcome to Todo App</h1>

                <p>Manage your daily tasks easily.</p>

                <div className="home-links">
                    <Link className="todo-button" to="/todos">
                        Go to Todo List
                    </Link>

                    <Link className="profile-link" to="/addTodo">
                        Add Todo
                    </Link>
                </div>
            </div>

            <div>
                <h2>Move to Todo</h2>

                <input
                    type="number"
                    min="1"
                    step="1"
                    placeholder="Enter Todo ID"
                    value={todoId}
                    onChange={(e) => setTodoId(e.target.value)}
                />

                <button onClick={handleMove}>
                    Move
                </button>
            </div>

        </div>
    );
}