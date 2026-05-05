import './Login.css'; 
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = ({setPageInfo, setIsLogin})=>{

    useEffect(()=>{
        setPageInfo("login"); 
    }, [setPageInfo]); 

    const nav = useNavigate(); 

    const [personalInfo, setPersonalInfo] = useState({
        userId: "", 
        pwd: "",
    }); 

    const onChangeInfo = (e)=>{
        const {name, value} = e.target; 

        setPersonalInfo({
            ...personalInfo, 
            [name] : value, 
        }); 
    }

    const onSubmit = (e)=>{
        e.preventDefault(); //폼 제출시에 새로고침 방지 
        
        const {userId, pwd} = personalInfo; 

        const users = JSON.parse(localStorage.getItem("users") || "[]"); 

        const targetUser = users.find((user)=>{
            return user.id === userId && user.pwd === pwd; 
        }); 

        if(!userId || !pwd){
            alert("아이디와 비밀번호를 모두 입력해주세요"); 
            
        }

        else if(targetUser){
            localStorage.setItem("userInfo", JSON.stringify(targetUser)); 
            setIsLogin(true); 
            nav("/"); 
        }

        else{
            alert("아이디와 비밀번호가 일치하지 않습니다!"); 
        }

        setPersonalInfo({
            userId: "",
            pwd: "",  
        }); 
    }


    return (
        <div className="Login page-content">
            <div className="login-container">
                <div className="login-header">
                    <h2>🔐 AI-BOARD 로그인</h2>
                    <p>커뮤니티를 이용하려면 로그인해주세요.</p>
                </div>

                <div className="login-body">
                    <div className="input-group">
                        <label>아이디</label>
                        <input
                            type="text"
                            name="userId"
                            value={personalInfo.userId}
                            onChange={onChangeInfo} 
                            placeholder="아이디를 입력하세요" 
                        />
                    </div>
                    <div className="input-group">
                        <label>비밀번호</label>
                        <input 
                            type="password" 
                            name="pwd"
                            value={personalInfo.pwd}
                            onChange={onChangeInfo}
                            placeholder="비밀번호를 입력하세요" 
                        />
                    </div>
                    <button className="btn-login" onClick={onSubmit}>
                        로그인 하기
                    </button>
                </div>

                <div className="login-footer">
                    <span>계정이 없으신가요?</span>
                    <button className="btn-link" onClick={()=> nav("/signUp")}>회원가입</button>
                </div>
            </div>
        </div>
    ); 
}

export default Login; 

/*
배운점 

1. onSubmit 함수에서 e.preventDefault()를 해준 이유: 

원래 HTML에서 <form>이나 <button type="submit">은 클릭하면 페이지 전체를 서버로 새로 전송하면서 새로고침하는 게 기본 동작이다.
하지만 리액트 같은 SPA(Single Page Application)에서는 페이지가 깜빡이며 새로고침되면 모든 상태(state)가 초기화되어버리기 때문에
이걸 방지하기 위함이다. 

2. const users = JSON.parse(localStorage.getItem("users") || "[]"); 
이 코드는 users라는 아이템이 로컬에 있으면 가져오고 없으면 빈 리스트를 파싱할 수 있게 해준 코드이다. 


*/