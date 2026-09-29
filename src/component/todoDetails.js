import { useParams } from "react-router-dom";
import useFetch from "../UseFetch";

export default function TodoDetails() {
    const { id } = useParams();
   const url="http://localhost:8000/todoList/";
    const {
        data: todo,
        loader,
        error
    } = useFetch( url + id);

    return (
        <>
            {loader && <div>Loading...</div>}
            {error && <div>Object not available</div>}

            {todo && (
                <div>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        readOnly
                    />

                    <span
                        style={{
                            textDecoration: todo.completed
                                ? "line-through"
                                : "none",
                        }}
                    >
                        {todo.title}
                    </span>
                </div>
            )}
        </>
    );
}