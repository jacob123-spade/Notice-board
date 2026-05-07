import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BoardDispatchContext, CommentDataContext, CommentDispatchContext} from "./Context";

const PostItem = ({id,title, date})=>{
    const nav = useNavigate();
    const {onDelete} = useContext(BoardDispatchContext); 
    const {onDeleteComment} = useContext(CommentDispatchContext); 
    const onDeletePost = ()=>{
        if(window.confirm("정말 이 글을 삭제하시겠습니까?")){
            onDelete(id); 
            // 글을 지웠는데 해당 글에 남겨진 댓글을 지우지 않으면 유령 댓글들이 생기게 된다. 이걸 해결해주기 위해서 해당 글의 아이디를 갖는 댓글도 삭제해줘야 한다.
            onDeleteComment(id);  
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