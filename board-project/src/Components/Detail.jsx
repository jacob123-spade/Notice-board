import "./Detail.css"; 
import { useNavigate, useParams } from "react-router-dom";
import {BoardDataContext, BoardDispatchContext, CommentDataContext, CommentDispatchContext } from "./Context"; 
import { useContext, useEffect, useRef, useState } from "react";
import Header from "./Header";
import CommentList from "./CommentList";


const Detail = ({setPageInfo, islogin})=>{ 
    const {id} = useParams();
    const data = useContext(BoardDataContext); 
    const comments = useContext(CommentDataContext); 
    
    {/* 로그아웃상태일 시에 애러가 발생할 수 있어 chaining을 사용했다. */}
    const storedUser = localStorage.getItem("userInfo"); 
    const currentUser = JSON.parse(storedUser)?.id || null; 

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
        return <div style={{padding: "20px"}}>존재하지 않는 게시글입니다</div>
    }

    return (
        <div className="Detail">
            <section id="detail" className="page-content">
                <Header initData={initData} islogin={islogin} currentUser={currentUser}></Header>
                <CommentList id={id} initCommentData={initCommentData} islogin={islogin} currentUser={currentUser}></CommentList>
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

7. 상태 동기화와 조건부 렌더링 최적화: 로컬 상태(isLiked)와 외부 데이터(currentUser, initData)가 불일치할 때 발생하는 UI 버그를 인지하고, 
이를 해결하기 위해 렌더링 시점의 최신 데이터를 기준으로 조건식을 재설계했다.

8. 댓글들을 계층별로 즉 대댓글은 해당 댓글의 자식으로 들어가게 하려면 랜더링 필더링을 거쳐야 한다. => 이 부분 코드는 나중에 다시 볼것 배울 점이 많음. 
필터링 후 매핑을 바로 할 수 있으며 매핑 내부에서 다시 필터링과 매핑을 반복 할 수 있다. => Idea
*/