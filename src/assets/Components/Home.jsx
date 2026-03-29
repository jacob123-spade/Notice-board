import "./Home.css"; 
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import { BoardDataContext} from "./Context";
import ListItem from "./ListItem";



const Home = ({setPageInfo})=>{
    const data = useContext(BoardDataContext); 
    const nav = useNavigate();

    useEffect(()=>{
        setPageInfo("home"); 
    }, [setPageInfo]); 

    
    return (
        <div className="Home">
            <section id="home" className="page-content active">
                <div className="flex-between">
                    <h1>전체 게시판</h1>
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
                            {data.map((item)=> {
                                return <ListItem key={item.id} {...item}></ListItem>
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    ); 
}

export default Home; 