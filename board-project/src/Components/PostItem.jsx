import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BoardDispatchContext } from "./Context";

const PostItem = ({id,title, date})=>{
    const nav = useNavigate();
    const {onDelete} = useContext(BoardDispatchContext); 

    const onDeletePost = ()=>{
        if(window.confirm("정말 이 글을 삭제하시겠습니까?")){
            onDelete(id); 
        }
    }

    return (
        <div className="my-post-item">
            <div className="post-content">
                <h4 className="post-title">{title}</h4>
                <span className="post-date">{date}</span>
            </div>
            <div className="post-actions">
                <button className="btn-edit" onClick={()=>nav(`/edit/${id}`)}>수정</button>
                <button className="btn-delete" onClick={onDeletePost}>삭제</button>
            </div>
        </div>
    ); 
}

export default PostItem; 