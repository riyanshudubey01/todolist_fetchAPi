import React,{useState,useEffect}  from "react";

const useFetch=function (url){
    const [data,setData]=useState(null);
    const [loader,setLoader]=useState(true);
    const [error,setError]=useState(null);

    useEffect(
        ()=>{
            const abortCont= new AbortController();
            fetch(url,{signal:abortCont.signal})
                .then((respose)=>{
                    if(!respose.ok){
                        throw new Error("Failed to Fetch data");
                    }
                    return respose.json();
                })
                .then(
                    (result)=> {
                        setData(result);
                        setLoader(false);
                    }
                )
                .catch((error)=> {
                    console.log(abortCont);
                    if(error.name==="AbortError") return;
                    console.log(error);

                    setError(error)
                })
            return ()=> abortCont.abort();

        },[url]
    )

    return{data,setData,loader, error};
}
export default useFetch;