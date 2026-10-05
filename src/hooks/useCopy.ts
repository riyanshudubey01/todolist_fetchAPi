import { useState, useCallback, useEffect } from "react";
const useCopy = (text: string) => {
    const[copied, setCopied] = useState(false);
    const copy = useCallback(async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
    }, [text]);
    useEffect(() => {
        setCopied(false);
    }, [text]);
    return { copied, copy };
}

export default useCopy;