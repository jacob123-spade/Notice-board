import "./MyPage.css"; 
import PostItem from "./PostItem";
import Error from "./Error";
import NotLogin from "./NotLogin";
import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { BoardDataContext } from "./Context";

const MyPage = ({setPageInfo, isLogin, setIsLogin})=>{

    useEffect(()=>{
        setPageInfo("mypage"); 
    }, [setPageInfo]);

    const {userId} = useParams();  
    const state = useContext(BoardDataContext);

    if(!state){
        return <Error/>
    }

    if(!isLogin){
        return (
            <NotLogin></NotLogin>
        )
    }

    const filteredData = state.filter((item)=>{
        return item.writer === userId;  
    }); 

   const recommendList = filteredData.map((item)=> Number(item.numRecommend) || 0);
   let numLikes = 0; 
   recommendList.forEach(elm=>{
    numLikes += elm; 
   }); 

   const LogOut = ()=>{
    //유저아이디 삭제해주기 
    localStorage.removeItem("userId"); 

    setIsLogin(false); 
   }

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
                        {/* 길이가 0일때는 작성한 글이 없습니다 라고 보이게 만들어줬다. */}
                        {filteredData.length === 0 ? 
                         (<div>작성한 글이 없습니다</div>) : (filteredData.map((item)=>{
                            return <PostItem key={item.id} {...item}></PostItem>
                        }))}
                    </div>
                </div>

                <div className="logout-container">
                    <button className="logout-btn" onClick={LogOut}>로그아웃</button>
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

2. localStorage에 유저 아이디를 생성해준 것은 증명서 같은 것이다. -> 현재 로그인하고 있는 사람이 누구인지를 밝혀주는 기능이다. 
나머지 DB관리는 BE의 영역이다. 


*/