import "./MyPage.css"; 
import PostItem from "./PostItem";
import Error from "./Error";
import NotLogin from "./NotLogin";
import { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BoardDataContext } from "./Context";

const MyPage = ({setPageInfo, isLogin, setIsLogin})=>{

    useEffect(()=>{
        setPageInfo("mypage"); 
    }, [setPageInfo]);

    const {userId} = useParams();  
    const state = useContext(BoardDataContext);
    const storedUser = localStorage.getItem("userInfo"); 
    const currentUser = storedUser ? JSON.parse(storedUser) : null; 
    const nav = useNavigate(); 

    if(!state){
        return <Error/>
    }

    useEffect(()=>{
        if(!isLogin || !currentUser){
            nav("/notlogin");  
            return; 
        }
    }, [isLogin, currentUser, nav]);
    

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
    localStorage.removeItem("userInfo"); 
    nav("/"); 
    setIsLogin(false); 
   }

    return (
        <div className="MyPage page-content">
            <div className="mypage-container">
                <div className="mypage-header">
                    <div className="user-badge">👤</div>
                    <h2>마이페이지</h2>
                    <p><strong>{currentUser.nickName}</strong>님, 안녕하세요! 오늘 작성한 글을 확인해보세요.</p>
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

3. useEffect(()=>{
        if(!isLogin || !currentUser){
            nav("/notlogin");  
            return; 
        }
    }, [isLogin, currentUser, nav]);

코드를 이렇게 작성해주는 이유는 리액트는 랜더링과 사이드 이펙트(페이지 이동, 데이터 요청 등)을 엄격하게 구분해서 화면을 그리는 중에 갑자기 
페이지를 이동시키게 되면 React.useEffect(), not when your component is first rendered.이런 오류를 띄우기 때문이다. 
그래서 useEffect를 이용하면 이 문제가 해결이 되는데 그 이유는 이 hook은 화면이 브라우저에 다 그려진 직후에 실행되도록 예약된 상자이기 때문이다. 

컴퓨터가 내 컴포넌트를 실행하는 순서 

1. Rendering 
2. Commit -> 리액트가 계산된 결과를 실제 브라우저 DOM에 반영(사용자 눈에 화면이 보인다)
3. Passive Effects : useEffect 안에 들어있는 코드를 실행합니다.


*/