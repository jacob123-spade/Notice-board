import { useEffect } from "react";

const AiBoard = ({setPageInfo})=>{

    useEffect(()=>{
        setPageInfo("aiBoard"); 
    }, [setPageInfo]); 

    return (
        <div>Ai</div>
    ); 
}

export default AiBoard; 