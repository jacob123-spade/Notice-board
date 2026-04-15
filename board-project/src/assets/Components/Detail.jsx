import "./Detail.css"; 
import { useNavigate, useParams } from "react-router-dom";
import {BoardDataContext, CommentDataContext} from "./Context"; 
import { useContext, useEffect } from "react";
import CommentItem from "./CommentItme";


const Detail = ({setPageInfo, login})=>{ 
    const {id} = useParams(); 
    const data = useContext(BoardDataContext); 
    const comments = useContext(CommentDataContext); 
    const initData = data.find((item)=>{
        return String(item.id) === String(id); 
    }); 

    const initCommentData = comments.filter((comment)=> {
        return comment.postId === Number(id); 
    }); 

    const nav = useNavigate(); 

    useEffect(()=>{
        setPageInfo("detail"); 
    }, [setPageInfo]); 


    if(!initData){
        return <div style={{padding: "20px"}}>Error!</div>
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
                        {login ? <button className="ui-btn btn-secondary" onClick={()=> nav(`/edit/${id}`)}>수정</button> : ""}
                    </div>
                </div>

                <div className="ui-card comment-container mt-20">
                    <h3 className="comment-title mb-20">댓글 수 {initCommentData.length}</h3>

                    <div className="comment-input-area mb-30">
                        <textarea 
                            className="comment-textarea" 
                            placeholder={login ? "따뜻한 댓글을 남겨주세요" : "로그인 후 사용 가능합니다"}
                            disabled={!login}
                        ></textarea>
                        <div className="comment-submit-wrapper">
                            {login ? <button className="ui-btn btn-primary">등록</button> : ""}
                        </div>
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

*/