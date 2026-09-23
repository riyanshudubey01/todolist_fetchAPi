import React,{useState,useEffect}  from "react";

const useFetch=function (url){
    const [data,setData]=useState(null);
    const [loader,setLoader]=useState(true);
    const [error,setError]=useState(null);

    useEffect(
        ()=>{
            fetch(url)
                .then((respose)=>{
                    if(!respose.ok){
                        throw new Error("Failed to Fetch data");
                    }
                    return respose.json();
                })
                .then(
                    (result)=> {
                        setData(result);
                    }
                )
                .catch((error)=> setError(error))
                .finally(setLoader(false));
        },[url]
    )

    return{data,setData,loader, error};
}
export default useFetch;