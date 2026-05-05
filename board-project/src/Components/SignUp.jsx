import './SignUp.css'; 
import { useNavigate } from "react-router-dom"
import { useState, useRef } from 'react';

const SignUp = ({setIsLogin})=>{
    const nav = useNavigate();  
    const [signUpInfo, setSignUpInfo] = useState({
        id: "",
        pwd: "", 
        nickName: "", 
    });
    const [confirm, setConfirm] = useState("");  
    const confirmRef = useRef(); 

    const onChangeSignUpInfo = (e)=>{
        const {name, value} = e.target; 

        setSignUpInfo({
            ...signUpInfo, 
            [name]: value, 
        }); 
    }; 

    const onChangeConfirm = (e)=>{
        setConfirm(e.target.value); 
    }

    const onSubmitUserInfo = (e)=>{
        e.preventDefault(); 

        if(signUpInfo.pwd !== confirm){
            setConfirm(""); 
            confirmRef.current.focus(); 
            return; 
        }

        const storedUser = JSON.parse(localStorage.getItem("users") || "[]"); 
        const newUserList = [...storedUser, signUpInfo]; 

        localStorage.setItem("users", JSON.stringify(newUserList)); 
        localStorage.setItem("userInfo", JSON.stringify(signUpInfo)); 
        setIsLogin(true); 
        nav(`/mypage/${signUpInfo.id}`); 
    }

    
    return (
        <div className="SignUp page-content">
            <div className="signup-container">
                <div className="signup-header">
                    <h2>📝 회원가입</h2>
                    <p>OOPS의 새로운 가족이 되어주세요!</p>
                </div>

                <form className="signup-body">
                    <div className="input-group">
                        <label>아이디</label>
                        <input
                        name="id"
                        value={signUpInfo.id}
                        onChange={onChangeSignUpInfo} 
                        placeholder="사용할 아이디를 입력하세요" />
                    </div>

                    <div className="input-group">
                        <label>비밀번호</label>
                        <input
                        name="pwd"
                        value={signUpInfo.pwd}
                        onChange={onChangeSignUpInfo} 
                        type="password" placeholder="문자, 숫자 포함 8자 이상" />
                    </div>

                    <div className="input-group">
                        <label>비밀번호 확인</label>
                        <input 
                        type="password"
                        value={confirm}
                        onChange={onChangeConfirm}
                        ref={confirmRef}
                        placeholder="비밀번호를 한 번 더 입력하세요"/>
                    </div>

                    <div className="input-group">
                        <label>닉네임</label>
                        <input
                        name="nickName"
                        value={signUpInfo.nickName}
                        onChange={onChangeSignUpInfo} 
                        placeholder="화면에 표시될 이름입니다" />
                    </div>

                    <button type="submit" className="btn-signup" onClick={onSubmitUserInfo}>
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

/*
배운점: 

1. form태그는 제출을 하면 화면을 새로고침하려는 성질이 있다. 그래서 e.preventDefault를 해줘야 한다. 


*/