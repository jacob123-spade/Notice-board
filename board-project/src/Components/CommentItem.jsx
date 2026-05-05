import './CommentItem.css'; 
import { useContext, useRef, useState } from 'react';
import { CommentDispatchContext } from './Context';
import { useNavigate } from 'react-router-dom';

const CommentItem = ({replyId, postId, parentId, content, writer, date, isLogin})=>{
    const [isClickReply, setIsClickReply] = useState(false); 
    const [replyValue, setReplyValue] = useState(""); 
    const replyRef = useRef(); 
    const parentRef = useRef(1); 
    const onCreateComment = useContext(CommentDispatchContext); 
    const storedUser = localStorage.getItem("userInfo");
    const currentUser = JSON.parse(storedUser)?.id || null; 
    const nav = useNavigate();  

    const onChangeReply = (e)=>{
        setReplyValue(e.target.value); 
    }

    const onRegisterReply = ()=>{
        if(!isLogin){
            window.alert("로그인 후 이용 가능합니다."); 
            nav("/login"); 
        }

        if(replyValue.trim()===""){
            replyRef.current.focus();
            return;  
        }

        const commentObj = { 
            postId: postId, 
            parentId: replyId, 
            content: replyValue, 
            writer: currentUser,
            date: new Date().toLocaleDateString(), 
        }
        console.log(commentObj); 
        onCreateComment(commentObj); 
        setReplyValue(""); 
        setIsClickReply(false); 
    }
    

    return (
        <div className="comment-list">
            <div className={`comment-item ${!parentId ? "" : "reply"}`}>
                <div className="comment-info">
                    <span className="comment-author">{writer}</span>
                    <span className="comment-date ml-10">{new Date(date).toLocaleDateString()}</span>
                </div>
                <div className="comment-content mt-10">
                    {content}
                </div>
                {!parentId ? <button className="btn-text mt-10" onClick={()=>setIsClickReply(!isClickReply)}>답글 달기</button> : ""}
                {isClickReply ? (
                    <div className="reply-section">
                        <input 
                        value={replyValue}
                        onChange={onChangeReply}
                        type="text" 
                        className="reply" 
                        placeholder='답글을 입력하세요'
                        ref={replyRef}
                        disabled={!isLogin}
                        />
                        <button className="btn-reply-submit" onClick={onRegisterReply}>등록</button>
                    </div>
                ) : ""}
            </div>
        </div>
    ); 
}

export default CommentItem; 