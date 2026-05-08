import { useState, useRef } from "react";

const SearchBar = ({filterQuery, setFilterQuery})=>{
    const [search, setSearch] = useState("");
    const searchRef = useRef();  

    const onChangeSearch = (e)=>{
        setSearch(e.target.value); 
    }

    //검색을 한 뒤에 다시 전체 목록으로 돌아가기 위한 코드 
    const onClearSearch = ()=>{
        setFilterQuery(""); 
        setSearch(""); 
    }

    const onSearch = (e)=>{
        e.preventDefault(); 

        if(search.trim()===""){
            searchRef.current.focus(); 
            return; 
        } 

        setFilterQuery(search); 
    }
    

    return (
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
    )
}; 

export default SearchBar; 