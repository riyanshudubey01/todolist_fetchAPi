import {useState} from "react";

export default function TodoList(){
    const[todos,setTodos]=useState([
        {
            id:1,
            title:"Learn React",
            completed:false
        },
        {
            id:2,
            title:"Practise",
            completed: false
        },
        {
            id:3,
            title:"Build Todo App",
            completed: false
        }
    ]);
    function toggleTodo(id){
        setTodos(
            todos.map((todo)=>
                todo.id===id?{...todo,complete: !todo.completed}
                    :todo)
        );
    }
    function deleteTodo(id){
        setTodos(todos.filter((todo)=>todo.id!==id));
    }
    return (
        <>
        <h1>Todo List</h1>
            {todos.map((todo)=>(
                <div key = {todo.id}>
                    <input type="checkbox"
                      checked={todo.completed}
                           onChange={()=>toggleTodo(todo.id)}
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
                    <button onClick={() => deleteTodo(todo.id)}>
                        Delete
                    </button>

                </div>
            ))}
        </>
    );
}