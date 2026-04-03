import { useEffect } from "react";

const NotFound = ({setPageInfo})=>{

    useEffect(()=>{
        setPageInfo("notFound"); 
    }, [setPageInfo]); 

    return <div>NotFound</div>
}; 

export default NotFound; 