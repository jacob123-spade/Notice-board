import './SignUp.css'; 
import { useNavigate } from "react-router-dom"

const SignUp = ()=>{
    const nav = useNavigate(); 

    return (
        <div className="SignUp page-content">
            <div className="signup-container">
                <div className="signup-header">
                    <h2>📝 회원가입</h2>
                    <p>AI-BOARD의 새로운 가족이 되어주세요!</p>
                </div>

                <form className="signup-body">
                    <div className="input-group">
                        <label>아이디</label>
                        <input placeholder="사용할 아이디를 입력하세요" />
                    </div>

                    <div className="input-group">
                        <label>비밀번호</label>
                        <input type="password" placeholder="문자, 숫자 포함 8자 이상" />
                    </div>

                    <div className="input-group">
                        <label>비밀번호 확인</label>
                        <input type="password" placeholder="비밀번호를 한 번 더 입력하세요" />
                    </div>

                    <div className="input-group">
                        <label>닉네임</label>
                        <input placeholder="화면에 표시될 이름입니다" />
                    </div>

                    <button type="submit" className="btn-signup">
                        가입하기 🚀
                    </button>
                </form>

                <div className="signup-footer">
                    <span>이미 계정이 있으신가요?</span>
                    <button className="btn-link" onClick={() => nav("/login")}>로그인하러 가기</button>
                </div>
            </div>
        </div>
    ); 
}

export default SignUp; 