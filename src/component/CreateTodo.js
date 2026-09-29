import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function CreateTodo(){
    const url="http://localhost:8000/todoList";
    const [title,setTitle] =useState("");
    const [id,setId]=useState("");
    const [completed,setCompleted] =useState("");
    const [error,setError]=useState("");

    const navigate=useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        try{
            fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    id:id,
                    title:title,
                    completed:completed
                })
            });
            navigate('/')
        }
        catch (error){
            console.log(error);
            setError(error);
        }
    }
    return(
        <>
        <h2>Add Todo</h2>
            {error && <p>Error occured check console</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Id</label>
                    <input
                        type="number"
                        value={id}
                        onChange={(e)=>
                            setId(e.target.value)}
                    />
                </div>
                <div>
                    <label>Title</label>
                    <input
                    type="text"
                    value={title}
                    onChange={(e)=>
                        setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Completed</label>
                    <input
                        type="text"
                        value={completed}
                        onChange={(e)=>
                            setCompleted(e.target.value)}
                    />
                </div>
                <button type="submit"> Add Todo</button>
            </form>
        </>
    )

    
}