import "./NotLogin.css"; 
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const NotLogin = ({setPageInfo})=>{
    const nav = useNavigate(); 

    useEffect(()=>{
        setPageInfo("notlogin"); 

    }, [setPageInfo]); 
    

    return (
        <div className="NotLogin page-content">
            <div className="notlogin-container">
                <div className="notlogin-content">
                    <div className="lock-icon">🔐</div>
                    <h2>로그인이 필요합니다</h2>
                    <p>
                        마이페이지는 회원 전용 서비스입니다.<br />
                        로그인하고 나만의 게시글을 관리해보세요!
                    </p>
                    
                    <div className="notlogin-buttons">
                        <button className="btn-login-go" onClick={() => nav("/login")}>
                            로그인하러 가기
                        </button>
                        <button className="btn-home-go" onClick={() => nav("/")}>
                            홈으로 이동
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ); 
}

export default NotLogin; 