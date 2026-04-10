import "./MyPage.css"; 
import PostItem from "./PostItem";
import Error from "./Error";
import NotLogin from "./NotLogin";
import { useEffect, useContext } from "react";
import { BoardDataContext } from "./Context";

const MyPage = ({setPageInfo, isLogin})=>{

    if(!isLogin){
        return (
            <NotLogin></NotLogin>
        )
    }

    useEffect(()=>{
        setPageInfo("mypage"); 
    }, [setPageInfo]); 

    const userId = localStorage.getItem("userId"); 
    const state = useContext(BoardDataContext); 

    if(!state){
        return <Error/>
    }

    const filteredData = state.filter((item)=>{
        return String(item.writer) === String(userId); 
    }); 

    if(!filteredData){
        return <Error/>
    }

   const recommendList = filteredData.map((item)=> Number(item.numRecommend) || 0);
   let numLikes = 0; 
   recommendList.forEach(elm=>{
    numLikes += elm; 
   }); 

    return (
        <div className="MyPage page-content">
            <div className="mypage-container">
                <div className="mypage-header">
                    <div className="user-badge">👤</div>
                    <h2>마이페이지</h2>
                    <p><strong>{userId}</strong>님, 안녕하세요! 오늘 작성한 글을 확인해보세요.</p>
                </div>

                <div className="mypage-summary">
                    <div className="summary-item">
                        <span className="label">작성한 글</span>
                        <span className="count">{filteredData.length}</span>
                    </div>
                    <div className="summary-item">
                        <span className="label">받은 좋아요</span>
                        <span className="count">{numLikes}</span>
                    </div>
                </div>

                <div className="mypage-body">
                    <h3 className="section-title">내가 쓴 게시글 관리</h3>
                    <div className="my-post-list">
                        {filteredData.map((item)=>{
                            return <PostItem key={item.id} {...item}></PostItem>
                        })}
                    </div>
                </div>
            </div>
        </div>
        
    ); 
}

export default MyPage; 

/*
배운점

1. forEach 함수는 내부에서 변수를 실행할시에 루프를 돌면서 매번 초기화된다. => 내부에서 변수 선언해주지 말고 외부에서 변수를 선언해준뒤에 
내부에서 사용하는 방식으로 가야한다. 


*/