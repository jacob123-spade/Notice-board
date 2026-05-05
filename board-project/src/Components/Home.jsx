import "./Home.css"; 
import { useState, useEffect, useContext, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom"; 
import { BoardDataContext} from "./Context";
import ListItem from "./ListItem";



const Home = ({setPageInfo})=>{
    const data = useContext(BoardDataContext); 
    const nav = useNavigate();
    

    useEffect(()=>{
        setPageInfo("home"); 
    }, [setPageInfo]); 

    const [search, setSearch] = useState("");
    const [filterQuery, setFilterQuery] = useState(""); // 실제 검색을 위한 변수 
    const searchRef = useRef();  

    const onChangeSearch = (e)=>{
        setSearch(e.target.value); 
    }

    const onSearch = (e)=>{
        e.preventDefault(); 

        if(search.trim()===""){
            searchRef.current.focus(); 
            return; 
        }

        setFilterQuery(search); 
    }

    const filteredData = !filterQuery ? data : data.filter((item)=>{
        return item.title.toLowerCase().includes(filterQuery.toLowerCase()); 
    }); 

    //검색을 한 뒤에 다시 전체 목록으로 돌아가기 위한 코드 
    const onClearSearch = ()=>{
        setFilterQuery(""); 
        setSearch(""); 
    }
    
    return (
        <div className="Home">
            <section id="home" className="page-content active">
                <div className="flex-between">
                    <h1>전체 게시판</h1>
                    <form className="search-section" onSubmit={onSearch}>
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            ref={searchRef}
                            onChange={onChangeSearch}
                        />

                        {/* 검색을 한 뒤에 기존 x표시를 추가해서 기존 전체 목록으로 돌아갈 수 있게 한다.*/}
                        {filterQuery && (
                            <button type="button" className="clear-btn" onClick={onClearSearch}>
                                ✕
                            </button>
                        )}
                        <button type="submit" className="search-btn" onClick={onSearch}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                    </form>
                    <button className="ui-btn btn-primary" onClick={()=>{
                        nav("/write"); 
                    }
                    }>새 글 쓰기</button>
                </div>
                <div className="ui-card">
                    <table className="ui-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th className="w-60p">제목</th>
                                <th>작성일</th>
                                <th>작성자</th>
                                <th>추천</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(filteredData.length > 0) ? filteredData.map((item)=> {
                                return <ListItem key={item.id} {...item}></ListItem>
                            }) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center", padding: "50px", color: "#94a3b8" }}>
                                        검색 결과가 존재하지 않습니다..
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
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
*/