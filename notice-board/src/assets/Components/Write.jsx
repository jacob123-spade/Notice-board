import "./Write.css"; 
import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {BoardDispatchContext} from "./Context"; 

const formattedDate = ()=>{
    const day = new Date(); 
    const year = day.getFullYear(); 
    const month = String(day.getMonth()+1).padStart(2, "0"); 
    const date = String(day.getDate()).padStart(2, "0"); 

    return `${year}-${month}-${date}`; 
}

const Write = ({setPageInfo})=>{
    const {onCreate } = useContext(BoardDispatchContext); 
    const nav = useNavigate(); 
    const idRef = useRef(1025);
    const titleRef = useRef(); 
    const contentRef = useRef();  

    useEffect(()=>{
        setPageInfo("write"); 
    }, [setPageInfo]); 

    const [writes, setWrites] = useState({
        title: "", 
        content: "", 
    });
    
    const onChangeInput = (e)=>{
        const {name, value} = e.target; 

        setWrites({
            ...writes, 
            [name]: value, 
        }); 
    }

    const onClickEnrolled = ()=>{
        if(writes.title.trim() === ""){
            titleRef.current.focus(); 
            return; 
        }

        if(writes.content.trim()===""){
            contentRef.current.focus(); 
            return; 
        }

        onCreate(
            idRef.current, 
            writes.title, 
            "익명의 작성자", 
            formattedDate(), 
            0, 
            writes.content, 
        ); 

        idRef.current++; 
        nav("/"); 
    }

    return (
        <div className="Write">
            <section id="write" className="page-content">
                <h1 className="mb-30">새 글 작성</h1>
                <div className="grid-2">
                    <div className="ui-card">
                        <input
                        ref={titleRef} 
                        name="title"
                        value={writes.title}
                        onChange={onChangeInput}
                        type="text" placeholder="제목을 입력하세요" className="ui-input"/>

                        <textarea 
                        ref={contentRef}
                        name="content"
                        value={writes.content}
                        onChange={onChangeInput}
                        placeholder="내용을 입력하세요..." className="ui-textarea"></textarea>

                        <div className="text-right mt-20">
                            <button className="ui-btn btn-primary" onClick={onClickEnrolled}>등록하기</button>
                        </div>
                    </div>
                    <aside className="ui-card ai-section">
                        <h3 className="c-secondary mb-30">🤖 AI 작성 도우미</h3>
                        <p className="c-light mt-15">현재 문맥을 분석하여 최적의 키워드를 제안합니다.</p>
                        <div className="ai-badge">#React #Project</div>
                    </aside>
                </div>
            </section>
        </div>
    ); 
}

export default Write; 

/*
배운점 

1. 데이터를 하나의 state로 관리할때는 e.target이라는 객체를 이용한다. 
그래서 기존에 바뀌지 않은 값은 그대로 두고(spread 연산자) 바뀐 값은 그 이름 속성을 가지는 값을 덮어써준다. 
그래서 html 태그 속성에 name 속성이 필요하다. 

2. useRef는 저장공간과, DOM 접근 이라는 두 가지 용도가 있다. 

용도 1 (변수 저장): 웹페이지가 리랜더링 돼도 초기화 되지 않아야 하는 값을 저장할때 사용 
용도 2 (DOM 접근): 특정 HTML 요소에 포커스를 주거나 크기를 잴 때 사용한다. 이때는 태그의 ref={ref} 속성에 연결한다.

주의! 하나의 Ref를 두 가지 용도로 쓰면 안된다. 
만약에 DOM 접근을 위해서 html 태그에 ref속성으로 래퍼런스를 연결하는 순간 해당 ref.current는 html 태그로 감싸지게 된다. 
그래서 랜더링 시에 문제가 발생

리액트의 { } (중괄호) 안에는 문자열이나 숫자만 넣을 수 있다. 
만약 실수로 ref.current에 담긴 HTML 객체를 그대로 출력하려고 하면 Objects are not valid as a React child 에러가 발생한다.




*/