import { useState, useRef, useContext } from "react";
import { CommentDispatchContext } from "./Context";
import CommentItem from "./CommentItem";


const CommentList = ({id, initCommentData, islogin, currentUser})=>{
    const [commentInfo, setCommentInfo] = useState({
        content: "", 
        writer: currentUser,
        date: new Date().toLocaleDateString(), 
    }); 

    const textRef = useRef(); 
    const {onCreateComment}= useContext(CommentDispatchContext);

    const onChangeCommentInfo = (e)=>{
        const {name, value} = e.target; 

        setCommentInfo({
            ...commentInfo, 
            [name]: value,  
        }); 
    }

    const onRegisterComment = ()=>{
        const commentObj = {...commentInfo, parentId: null, postId: Number(id)};
        if(commentInfo.content.trim()===""){
            textRef.current.focus(); 
            return; 
        }
        onCreateComment(commentObj); 
        setCommentInfo({
            ...commentInfo, 
            content: "", 
        }); 
    }

    return (
        <div className="ui-card comment-container mt-20">
            <h3 className="comment-title mb-20">댓글 수 {initCommentData.length}</h3>
            <div className="comment-input-area mb-30">
                <textarea 
                    className="comment-textarea" 
                    placeholder={islogin ? "따뜻한 댓글을 남겨주세요" : "로그인 후 사용 가능합니다"}
                    name="content"
                    value={commentInfo.content}
                    onChange={onChangeCommentInfo}
                    disabled={!islogin}
                    ref={textRef}
                ></textarea>
                <div className="comment-submit-wrapper">
                    {islogin ? <button className="ui-btn btn-primary" onClick={onRegisterComment}>등록</button> : ""}
                </div>
            </div>
            
            {initCommentData.length === 0 ? (
            <p>첫번째 댓글을 남겨보세요 </p> 
            ): (
            /*
            댓글을 계층적으로 짜주기 위해서 이렇게 짰다. 우선은 메인 댓글을 먼저 랜더링 해주고 그 다음 대댓글을 랜더링 해주는 식으로 짜주었다. 
            */ 
            initCommentData.filter((item)=> item.parentId === null).map((parent)=>(
            <div key={parent.id} className="comment-section">
                <CommentItem {...parent} isLogin={islogin} replyId={parent.id}></CommentItem>

                {/*대댓글 랜더링 영역*/}
                {initCommentData.filter((item)=>item.parentId===parent.id).map((child) => {
                    return <CommentItem key={child.id} {...child} isLogin={islogin} replyId={child.id}></CommentItem>
                })}
            </div>
            )))}
            
        </div>
    )
}

export default CommentList; 