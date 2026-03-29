import './App.css'; 
import { Routes, Route} from "react-router-dom"; 
import { useReducer, useState } from 'react';
import { BoardDataContext, BoardDispatchContext } from './assets/Components/Context';
import SideBar from './assets/Components/SideBar';
import Home from './assets/Components/Home';
import Write from './assets/Components/Write';
import Detail from './assets/Components/Detail';
import AiBoard from './assets/Components/AiBoard';

const mockPosts = [
    { 
        id: 1024, 
        title: "AI 협업 프로젝트 팀원을 찾습니다!", 
        writer: "김프론트", 
        date: "2026-03-26", 
        numRecommend: 24,
        content: "리액트와 AI API를 연동하는 오픈소스 프로젝트입니다. 함께하실 분!" 
    },
    { 
        id: 1023, 
        title: "오늘의 AI 뉴스: GPT-5 출시 임박?", 
        writer: "이테크", 
        date: "2026-03-25", 
        numRecommend: 12,
        content: "최신 AI 동향을 정리해드립니다. 확인해보세요."
    },
    { 
        id: 1022, 
        title: "초보자를 위한 리액트 상태관리 가이드", 
        writer: "박코딩", 
        date: "2026-03-24", 
        numRecommend: 38,
        content: "Context API부터 Redux까지 한눈에 살펴봅시다."
    }
];

const reducer = (state, action)=>{
  switch(action.type){
    case "CREATE": 
      return [action.data, ...state]; 
  }

}

function App() {
  const [state, dispatch] = useReducer(reducer, mockPosts); 
  const [pageInfo, setPageInfo] = useState("home"); //내가 현재 들어간 페이지 정보를 반환 -> SideBar 디자인을 위해서 사용 

  const onCreate = (id, title, writer, date, numRecommend, content)=>{
    dispatch({
      type: "CREATE", 
      data: {
        id: id, 
        title: title, 
        writer: writer, 
        date: date, 
        numRecommend: numRecommend, 
        content: content,
      }
    }); 
  }

    

  return (
    <BoardDataContext.Provider value={state}>
      <BoardDispatchContext.Provider value={{onCreate }}>
        <div className='App'>
          <SideBar pageInfo={pageInfo}></SideBar>
          <Routes>
            <Route path="/" element={<Home setPageInfo={setPageInfo}></Home>}></Route>
            <Route path="/write" element={<Write setPageInfo={setPageInfo}></Write>}></Route>
            <Route path="/detail/:id" element={<Detail setPageInfo={setPageInfo}></Detail>}></Route>
            <Route path="/ai" element={<AiBoard setPageInfo={setPageInfo}></AiBoard>}></Route>
          </Routes>
        </div>
      </BoardDispatchContext.Provider>
    </BoardDataContext.Provider>
  )
}

export default App; 

/*

배운점 

1. pageInfo, setPageInfo를 관리해주는 것은 사이드바와 각 상세페이지 간의 연결고리를 만들어줘서 
디자인 적용이 용이하게끔하기 위함이다. 

각 페이지는 페이지가 로딩됐을때 자신이 어떤 페이지인지 setPageInfo를 props로 받아서 전달해주도록 했다. (useEffect 사용); 
그런다음 바뀐 pageInfo를 가지고 sideBar에서 디자인이 바뀔 수 있도록 개선 

-> 왜 각 페이지에서 setPageInfo가 바뀔 때마다 useEffect를 실행해 주는가? 그냥 처음 마운트 될때만 실행해주면 되는 거 아닌가? 
=> React hook 사용 규칙 때문에 그렇다. 

리액트의 원칙: "useEffect 안에서 사용하는 외부 변수(함수)는 의존성 배열에 다 적어줘라!"라는 규칙 때문이다.

실제 동작: 하지만 setPageInfo 같은 상태 변경 함수는 리액트가 절대 변하지 않도록(Memoized) 보장해 준다.

결론: 즉, []를 쓰나 [setPageInfo]를 쓰나 결과적으로는 마운트 시 딱 한 번만 실행되는 건 똑같다. setPageInfo 자체가 안 변하지 않기 때문!





*/
