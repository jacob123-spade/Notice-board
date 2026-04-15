import NotLogin from "./NotLogin";
import "./SideBar.css"; 
import { useNavigate } from "react-router-dom";

const SideBar = ({pageInfo, isLogin})=>{
    const nav = useNavigate(); 
    
    const onClickMyPage = ()=>{
        const storedUser = localStorage.getItem("userInfo"); 

        if(storedUser){
            const currentUser = JSON.parse(storedUser); 
            nav((`/mypage/${currentUser.id}`)); 
        }

        else{
            nav("/notlogin"); 
        }

    }

    return (
        <div className="sidebar">
            <h2>OOPS</h2>
            <nav>
                <div className={`nav-item ${pageInfo === "home" ? "active" : ""}`} onClick={()=>nav("/")}>🏠 커뮤니티 홈</div>
                <div className={`nav-item ${pageInfo === "write" ? "active" : ""}`} onClick={()=>nav("/write")}>✍️ 새 글 작성</div>
                {pageInfo === "detail" ? <div className={`nav-item ${pageInfo === "detail" ? "active" : ""}`}>🔍 상세페이지</div> : ""}
                {pageInfo === "edit" ? <div className={`nav-item ${pageInfo === "edit" ? "active" : ""}`}>✒️ 수정페이지</div>: ""}
                <div className={`nav-item ${pageInfo === "login" ? "active" : ""}`} onClick={()=>nav("/login")}>🔓 로그인</div>
                <div className={`nav-item ${pageInfo === "mypage" ? "active" : ""}`} onClick={onClickMyPage}>👤 마이페이지</div>
            </nav>
        </div>
    ); 
}; 

export default SideBar; 


/*

배운점: 

1. isLogin은 현재 이 컴포넌트에서는 직접적으로 쓰이지 않는다. 그러나 이렇게 프롭스로 넘겨줘서 isLogin의 값이 달라지면 재랜더링 할 수 있게 해준다.

*/