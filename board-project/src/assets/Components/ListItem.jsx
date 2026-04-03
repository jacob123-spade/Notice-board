import { useNavigate } from "react-router-dom";

const ListItem = ({id, title, date, writer, numRecommend})=>{
    const nav = useNavigate(); 

    return (
        <tr className="tr-link" onClick={()=>nav(`/detail/${id}`)}>
            <td>{id}</td>
            <td className="fw-600">{title}</td>
            <td> {date}</td>
            <td>{writer}</td>
            <td className="c-primary">{numRecommend}</td>
        </tr>
    ); 
}

export default ListItem; 