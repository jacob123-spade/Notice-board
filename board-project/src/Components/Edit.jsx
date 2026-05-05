import "./Edit.css"; 
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import { BoardDataContext, BoardDispatchContext } from "./Context";

const Edit = ({setPageInfo})=>{
    const { id } = useParams(); 
    const datas = useContext(BoardDataContext); 
    const {onUpdate, onDelete} = useContext(BoardDispatchContext); 
    const initData = datas.find((data)=>{
        return String(data.id) === String(id); 
    }); 
    
    const [input, setInput] = useState({
        title: initData?.title || "", 
        content: initData?.content || "",
    }); 

    const nav = useNavigate(); 
    const titleRef = useRef(); 
    const contentRef = useRef(); 

    useEffect(()=>{
        setPageInfo("edit"); 
    }, [setPageInfo]);


    if(!initData){
        return <div style={{padding: "20px"}}>Error! The Page does not Exsist</div>
    }; 
    

    const onChangeInput = (e)=>{
        const {name, value} = e.target; 
        
        setInput({
            ...input, 
            [name]: value, 
        }); 
    }

    const onUpdateBoard = ()=>{
        if(input.title.trim()===""){
            titleRef.current.focus(); 
            return; 
        }

        if(input.content.trim()===""){
            contentRef.current.focus(); 
            return; 
        }

        onUpdate({
            ...initData, 
            id: Number(id), 
            title: input.title, 
            content: input.content, 
        }); 
        nav("/"); 
    }; 

    const onDeleteBoard = ()=>{
        if(window.confirm("정말 게시글을 삭제하시겠습니까?")){
            onDelete(Number(id)); 
            nav("/"); 
        }
    }

    return (
        <div className="Edit page-content active">
            <div className="ui-card edit-container">
                <header className="edit-header">
                    <h2>📝 게시글 수정</h2>
                    <p className="c-light">내용을 자유롭게 수정하거나 삭제할 수 있습니다.</p>
                </header>

                <div className="edit-body">
                    <div className="input-group">
                        <label>제목</label>
                        <input
                        name="title" 
                        ref={titleRef}
                        value={input.title}
                        onChange={onChangeInput}
                        placeholder="제목을 입력하세요"
                        />
                    </div>

                    <div className="input-group">
                        <label>내용</label>
                        <textarea 
                        name="content"
                        ref={contentRef}
                        value={input.content}
                        onChange={onChangeInput}
                        placeholder="수정할 내용을 입력하세요"/>
                    </div>
                </div>

                <footer className="edit-footer">
                    <button className="btn-delete" onClick={onDeleteBoard}>
                        🗑️ 게시글 삭제
                    </button>
                    <div className="action-buttons">
                        <button className="btn-cancel" onClick={()=>nav("/")}>취소</button>
                        <button className="btn-submit" onClick={onUpdateBoard}>수정 완료</button>
                    </div>
                </footer>
            </div>
        </div>
    ); 
}

export default Edit; 

/*
배운점 

1. 원본 데이터를 value로 설정할 경우 데이터 수정이 불가하다. 항상 state로 데이터를 변경한 후에 추가해야 한다. 
2. params는 contents를 스트링으로 가져온다. -> 데이터 타입에 주의해라! 
3. update 함수 구현시에 파라미터를 여러개 쓰는 것보다는 그냥 아얘 객체로 넘기는 것이 더 낫다. 




*/