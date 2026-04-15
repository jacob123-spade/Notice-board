const CommentItem = ({parentId, content, writer, date})=>{
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
                <button className="btn-text mt-10">답글 달기</button>
            </div>
        </div>
    ); 
}

export default CommentItem; 