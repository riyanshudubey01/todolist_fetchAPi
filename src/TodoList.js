import {useEffect, useState} from "react";
import useFetch from "./UseFetch";

export default function TodoList(){
    const{
        data: todos,
        setData: setTodos,
        loader,
        error
    }=useFetch("http://localhost:8000/todoList")
    function toggleTodo(id){
        setTodos(
            todos.map((todo)=>
                todo.id===id?{...todo,completed: !todo.completed}
                    :todo)
        );
    }
    function deleteTodo(id){
        setTodos(todos.filter((todo)=>todo.id!==id));
    }
    if(error){
        return <>
            <h2>{error}</h2>
        </>
    }
    return (
        <>
        <h1>Todo List</h1>
            {loader ?
            <h1>Loading</h1>:
            todos && todos.map((todo)=>(
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