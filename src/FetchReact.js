import React,{useState,useEffect}  from "react";

const FetchReact=function (props){
    const [data,setData]=useState([{id:2},{id:3}]);
    useEffect(()=>{
        fetch("https://api.example.com/data")
            .then((response)=>response.json())
            .then((data)=>setData(data.slice(0,19)))
            .catch((error)=>{
                console.log(error);
                setData([...data,{ "id":1}]);
            });
    },[data]);
    return(
        <>
         <h1>Data fetched</h1>
            <div>
               <ul>
                   {data.map((d)=>{
                       return <li key={d.id}>
                           {d}
                       </li>
                   })}
               </ul>
            </div>
        </>
    )
}
export default FetchReact;