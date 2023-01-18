import {useEffect, useState} from "react";

const useDebounce = (value,delay)=>{
    const [debouncedValue,setDebouncedValue] = useState(value);
    useEffect(()=>{
        const timer = setTimeout(()=>setDebouncedValue(value),delay || 1000)
            return ()=>{
                clearTimeout(timer)
            }
    },[value,debouncedValue])

    return debouncedValue;
}

export default useDebounce