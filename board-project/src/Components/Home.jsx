import "./Home.css"; 
import { useState, useEffect, useContext, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom"; 
import { BoardDataContext} from "./Context";
import SearchBar from "./SearchBar";
import PostList from "./PostList";

const Home = ({setPageInfo})=>{
    const data = useContext(BoardDataContext); 
    const nav = useNavigate();
    const [filterQuery, setFilterQuery] = useState(""); // 실제 검색을 위한 변수 
    

    useEffect(()=>{
        setPageInfo("home");
    }, [setPageInfo]); 


    const filteredData = ()=>{
        return !filterQuery ? data : data.filter((item)=>{
            return item.title.toLowerCase().includes(filterQuery.toLowerCase()); 
        }); 
    }


    return (
        <div className="Home">
            <section id="home" className="page-content active">
                <div className="flex-between">
                    <h1>전체 게시판</h1>
                    {/* SearchBar.jsx Component */}
                    <SearchBar filterQuery={filterQuery} setFilterQuery={setFilterQuery}></SearchBar>
                    {/*------------------------------------------------*/}
                    <button className="ui-btn btn-primary" onClick={()=>{
                        nav("/write"); 
                    }
                    }>새 글 쓰기</button>
                </div>

                {/* PostList.jsx Component */}
                <PostList filteredData={filteredData()}></PostList>
                {/* ------------------------------------------ */}
            </section>
        </div>
    ); 
}

export default Home; 

/*
배운점 

1. Submit 기반의 인터페이스 통합: <form> 태그의 onSubmit을 활용하면 별도의 키보드 이벤트(onKeyDown)나 버튼의 onClick 없이도 일관된 사용자 경험을 제공할 수 있음을 체득했다.

2. {filterQuery && (
    <button type="button" className="clear-btn" onClick={onClearSearch}>
        ✕
    </button>
)}

&& => 단축 평가 

A && B: 는 A가 참이면 B를 반환하고 A가 거짓이면 A를 반환한다. 

이 코드에서는 filterQuery가 참이면 즉 내용물이 있으면 x버튼을 그리고 없어서 "" 형태이면 ""를 그려준다. 
리액트는 빈문자열을 화면에 그리지 않는다.  

3. 

const filteredData = ()=>{
        return !filterQuery ? data : data.filter((item)=>{
            return item.title.toLowerCase().includes(filterQuery.toLowerCase()); 
        }); 
    }

이런 코드 props로 넘겨줄때 함수자체로 넘겨줄지 아니면 변수로 넘겨줄지 항상 주의하기 
함수 자체로 넘겨주면 그냥 함수 이름만 props로 넘겨주면 되고 변수로 넘겨주고 싶다면 함수를 실행해서 넘겨줘야 한다. 즉 filteredData(). 
*/