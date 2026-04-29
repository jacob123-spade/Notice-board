import "./Detail.css"; 
import { useNavigate, useParams } from "react-router-dom";
import {BoardDataContext, BoardDispatchContext, CommentDataContext, CommentDispatchContext } from "./Context"; 
import { useContext, useEffect, useRef, useState } from "react";
import CommentItem from "./CommentItem";


const Detail = ({setPageInfo, login})=>{ 
    const {id} = useParams(); 
    const data = useContext(BoardDataContext); 
    const {onUpdate} = useContext(BoardDispatchContext); 
    const comments = useContext(CommentDataContext); 
    const onCreateComment = useContext(CommentDispatchContext);
    {/* 로그아웃상태일 시에 애러가 발생할 수 있어 chaining을 사용했다. */}
    const storedUser = localStorage.getItem("userInfo"); 
    const currentUser = JSON.parse(storedUser)?.id || null; 
    const textRef = useRef(); 
    const [commentInfo, setCommentInfo] = useState({
        content: "", 
        writer: currentUser,
        date: new Date().toLocaleDateString(), 
    }); 

    const initData = data.find((item)=>{
        return String(item.id) === String(id); 
    }); 

    const [isLiked, setIsLiked] = useState(initData.likedUsers.includes(currentUser)); 
    //좋아요를 누른 user관리 리스트 
    const [likedUsersLst, setLikedUsersLst] = useState([...initData.likedUsers]); 

    

    const initCommentData = comments.filter((comment)=> {
        return comment.postId === Number(id); 
    }); 

    const nav = useNavigate(); 

    useEffect(()=>{
        setPageInfo("detail"); 
    }, [setPageInfo]); 


    if(!initData){
        return <div style={{padding: "20px"}}>존재하지 않는 게시글입니다</div>
    }

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

        console.log(comments); 
    }

    let [likeCount, setLikeCount] = useState(initData.numRecommend); 

    const onLikeClick = ()=>{
        if(!login){
            alert("로그인 후에 이용 가능합니다."); 
            nav("/login"); 
            return; 
        }

        const nextIsLiked = !isLiked; 
        const nextLikeCount = isLiked ? likeCount -1 : likeCount+1; 
        const nextLikedUsers = isLiked ? likedUsersLst.filter((user)=> user !==currentUser) : [...likedUsersLst, currentUser]; 

        setIsLiked(nextIsLiked); 
        setLikeCount(nextLikeCount); 
        setLikedUsersLst(nextLikedUsers); 

        //여기에 변수로 next값들을 넣어주는 이유는 useState는 상태를 바로 바꾸지 않고 예약해주는 역할을 하기 때문에(데이터 비동기처리) 이걸 곧바로 바꿔주기 위함이다. 
        const updatedData = {
            ...initData, 
            numRecommend: nextLikeCount,
            likedUsers: nextLikedUsers, 
        }

        onUpdate(updatedData); 
    }

    return (
        <div className="Detail">
            <section id="detail" className="page-content">
                {/* 게시글 본문 카드 */}
                <div className="ui-card detail-container">
                    <div className="detail-header">
                        <h1 className="detail-title mt-10">{initData.title}</h1>
                        <div className="c-light mt-20">
                            <span>{`작성자: ${initData.writer} | ${initData.date}`}</span>
                        </div>
                    </div>
                    <div className="detail-body">
                        {initData.content}
                    </div>
                    <div className="ui-card ai-section mt-40">
                        <h4 className="mb-30">🔗 AI 추천 연관글</h4>
                        <p className="c-primary tr-link">👉 오픈소스 기여 시작하기 가이드</p>
                    </div>
                    <div className="button-section">
                        <button className="ui-btn btn-secondary" onClick={()=> nav("/")}>목록</button>
                    </div>
                </div>

                <div className="ui-card comment-container mt-20">
                    <h3 className="comment-title mb-20">댓글 수 {initCommentData.length}</h3>

                    <div className="comment-input-area mb-30">
                        <textarea 
                            className="comment-textarea" 
                            placeholder={login ? "따뜻한 댓글을 남겨주세요" : "로그인 후 사용 가능합니다"}
                            name="content"
                            value={commentInfo.content}
                            onChange={onChangeCommentInfo}
                            disabled={!login}
                            ref={textRef}
                        ></textarea>
                        <div className="comment-submit-wrapper">
                            {login ? <button className="ui-btn btn-primary" onClick={onRegisterComment}>등록</button> : ""}
                        </div>
                    </div>

                    <div className="recommend-section">
                        <button 
                            className={`recommend-btn ${isLiked ? "active" : ""}`} 
                            onClick={onLikeClick}>
                            <span className="thumb-icon">👍</span>
                            <span className="recommend-label">추천</span>
                            <span className="recommend-count">{likeCount}</span>
                        </button>
                    </div>

                   {initCommentData.length === 0 ? (
                    <p>첫번째 댓글을 남겨보세요 </p> 
                   ): (initCommentData.map((item)=>{
                    return <CommentItem key={item.id} {...item}></CommentItem>
                   }))}
                    
                </div>
            </section>
        </div>
    ); 
}
export default Detail; 

/*

배운점 

1. useParams는 객체다 -> URL 파라미터는 {파라미터명: "값"} 형태의 객체로 들어오므로, const {id} = useParams()
처럼 구조분해 할당을 쓴다. 

2. 타입 일치 확인 중요 
URL로 전달되는 값은 무조건 **문자열**이다. 원본 데이터의 ID가 숫자라면 반드시 형 변환을 거쳐야 한다. 

3. useParams는 App.jsx에서 설정한 이름과 Detail.jsx에서 부르는 파라미터 명이 서로 다르면 
해당 값이 undefined로 찍히게 된다. 

4. 리액트에서는 변수를 let, const로 지정해놓으면 변수를 바꿔도 화면에는 랜더링이 안된다. 그 이유는 재랜더링을 변수가 바꼈다고 자동으로 
하지 않기 때문이다. 그래서 useState를 이용해서 변수관리를 해줘야 한다. 

5. ++, --는 각각 +=1, -=1의 의미를 담고 있어서 const에서는 사용이 불가하다. -> 주의 할것 

6. 유저당 한번의 좋아요를 누르게 하기 위해서는 데이터 구조를 좀 변경해줘야 한다. -> 
데이터 상에서 누가 좋아요를 눌렀는지를 배열로 관리해주도록 하겠다. 

*/