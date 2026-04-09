import "./SideBar.css"; 
import { useNavigate } from "react-router-dom";

const SideBar = ({pageInfo})=>{

    const nav = useNavigate(); 

    
    return (
        <div className="sidebar">
            <h2>AI-BOARD</h2>
            <nav>
                <div className={`nav-item ${pageInfo === "home" ? "active" : ""}`} onClick={()=>nav("/")}>🏠 커뮤니티 홈</div>
                <div className={`nav-item ${pageInfo === "write" ? "active" : ""}`} onClick={()=>nav("/write")}>✍️ 새 글 작성</div>
                {pageInfo === "detail" ? <div className={`nav-item ${pageInfo === "detail" ? "active" : ""}`}>🔍 상세페이지</div> : ""}
                {pageInfo === "edit" ? <div className={`nav-item ${pageInfo === "edit" ? "active" : ""}`}>✒️ 수정페이지</div>: ""}
                <div className={`nav-item ${pageInfo === "login" ? "active" : ""}`} onClick={()=>nav("/login")}>🔓 로그인</div>
            </nav>
        </div>
    ); 
}; 

export default SideBar; 