import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

interface UseFetchResult<T> {
    data: T | null;
    setData: Dispatch<SetStateAction<T | null>>;
    loader: boolean;
    error: Error | null;
}

function useFetch<T>(url: string): UseFetchResult<T> {
    const [data,setData]=useState<T | null>(null);
    const [loader,setLoader]=useState(true);
    const [error,setError]=useState<Error | null>(null);

    useEffect(
        ()=>{
            const abortCont= new AbortController();
            fetch(url,{signal:abortCont.signal})
                .then((response)=>{
                    if(!response.ok){
                        throw new Error("Failed to Fetch data");
                    }
                    return response.json() as Promise<T>;
                })
                .then(
                    (result)=> {
                        setData(result);
                        setLoader(false);
                    }
                )
                .catch((caughtError: unknown) => {
                    if(caughtError instanceof DOMException && caughtError.name === "AbortError") return;
                    const fetchError = caughtError instanceof Error ? caughtError : new Error(String(caughtError));
                    setError(fetchError);
                })
            return ()=> abortCont.abort();

        },[url]
    )

    return{data,setData,loader, error};
}
export default useFetch;