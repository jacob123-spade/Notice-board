import './App.css'; 
import { Routes, Route} from "react-router-dom"; 
import { useReducer, useRef, useState } from 'react';
import { BoardDataContext, BoardDispatchContext, CommentDataContext, CommentDispatchContext } from './assets/Components/Context';
import SideBar from './assets/Components/SideBar';
import Home from './assets/Components/Home';
import Write from './assets/Components/Write';
import Detail from './assets/Components/Detail';
import Edit from './assets/Components/Edit'; 
import MyPage from './assets/Components/MyPage';
import Login from './assets/Components/Login';
import SignUp from './assets/Components/SignUp';
import NotFound from './assets/Components/NotFound'; 
import NotLogin from './assets/Components/NotLogin';

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
    }, 

    {
      id: 1025, 
      title: "리액트 공부 방향 잡기", 
      writer: "admin", 
      date: "2024-10-22", 
      numRecommend: 100, 
      content: "리액트 공부방향", 
    }, 

    {
      id: 1026, 
      title: "로그인 페이지", 
      writer: "admin", 
      date: "2024-10-4", 
      numRecommend: 20, 
      content: "로그인 페이지 만들기", 
    }, 

    {
      id: 1027, 
      title: "공부 효율적으로 하는 법", 
      writer: "admin", 
      date: "2024-10-13", 
      numRecommend: 100, 
      content: "공부방법", 
    }
];

const initialComment = [
  {
    //1024번 게시글의 1번째 댓글 
    id: 1, 
    postId: 1024, 
    parentId: null, 
    content: "이 내용으로 많이 해주세요!!", 
    writer: "admin", 
    date: new Date("2023-10-22").getTime(), 
  }, 

  {
    //1024번 게시글의 2번째 댓글임과 동시에 첫번째 댓글의 댓글 (대댓글)
    id: 2, 
    postId: 1024, 
    parentId: 1, //1번 댓글의 댓글 즉 대댓글 
    content: "공감합니다.", 
    writer: "hamin", 
    date: new Date("2023-10-25").getTime(), 
  }, 

  {
    id: 3, 
    postId: 1023, 
    parentId: null, 
    content: "이런 글 이제 식상", 
    writer: "Jack", 
    date: new Date("2025-03-22").getTime(), 
  }, 

]

const reducer = (state, action)=>{
  switch(action.type){
    case "CREATE": 
      return [action.data, ...state]; 

    case "DELETE": 
      return state.filter((item)=> item.id !== action.id); 

    case "UPDATE": 
      return state.map((item)=> item.id === action.data.id ? action.data : item);
    
    default: 
      return state; 
  }

}

function App() {
  const [state, dispatch] = useReducer(reducer, mockPosts); 
  const [pageInfo, setPageInfo] = useState("home"); //내가 현재 들어간 페이지 정보를 반환 -> SideBar 디자인을 위해서 사용 
  const idRef = useRef(1025); 
  const [isLogin, setIsLogin] = useState(false); 
  const [comments, setComments] = useState(initialComment); 
  const commentIdRef = useRef(1028); 

  const onCreate = (title, writer, date, numRecommend, content)=>{
    dispatch({
      type: "CREATE", 
      data: {
        id: idRef.current++, 
        title: title, 
        writer: writer, 
        date: date, 
        numRecommend: numRecommend, 
        content: content,
      }
    }); 
  }

  const onDelete = (id)=>{
    dispatch({
      type: "DELETE", 
      id: id, 
    })
  }

  const onUpdate = (updatedData)=>{
    dispatch({
      type: "UPDATE", 
      data: updatedData, 
    })
  }

  const onCreateComment = (postId, parentId, content, writer)=>{
    const newComment = {
      id: commentIdRef.current++,
      postId: postId, 
      parentId: parentId, 
      content: content, 
      writer: writer, 
      date: new Date().getTime(), 
    }

    setComments([newComment, ...comments]); 
  }; 

  return (
    <BoardDataContext.Provider value={state}>
      <BoardDispatchContext.Provider value={{onCreate, onDelete, onUpdate }}>
        <CommentDataContext.Provider value={comments}>
          <CommentDispatchContext.Provider value={onCreateComment}>
            <div className='App'>
              <SideBar pageInfo={pageInfo}></SideBar>
              <Routes>
                <Route path="/" element={<Home setPageInfo={setPageInfo}></Home>}></Route>
                <Route path="/write" element={<Write setPageInfo={setPageInfo} isLogin={isLogin}></Write>}></Route>
                <Route path="/detail/:id" element={<Detail setPageInfo={setPageInfo} login={isLogin}></Detail>}></Route>
                <Route path="/edit/:id" element={<Edit setPageInfo={setPageInfo}></Edit>}></Route>
                <Route path="/login" element={<Login setPageInfo={setPageInfo} setIsLogin={setIsLogin}></Login>}></Route>
                <Route path="/signUp" element={<SignUp setIsLogin={setIsLogin}></SignUp>}></Route>
                <Route path="/mypage/:userId" element={<MyPage setPageInfo={setPageInfo} isLogin={isLogin} setIsLogin={setIsLogin}></MyPage>}></Route>
                <Route path="/notlogin" element={<NotLogin setPageInfo={setPageInfo}></NotLogin>}></Route>
                <Route path="/*" element={<NotFound setPageInfo={setPageInfo}></NotFound>}></Route>
              </Routes>
            </div>
          </CommentDispatchContext.Provider>
        </CommentDataContext.Provider>
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

2. useReducer를 쓰는 이유는 

“유지보수 + 확장성 + 예측 가능성” 때문에 쓴다

3. idRef를 App.jsx에서 해준 이유는 Write.jsx에서 할 경우 글을 다 쓴다음에 홈페이지로 넘어가면 
writer.jsx가 언마운트 됐다가 다시 그려질때마다 레퍼런스가 초기화 되기 때문이다. => useRef는 페이지 내부 state가 바뀌거나 해서 
재랜더링 될때는 값을 유지하지만 언마운트됐다가 다시 그려질때는 그 값을 잊어버린다.  

4. 댓글의 데이트 객체를 new Date().getTime()을 사용하는 경우는 getTime이 UTC 값을 반환해서 정렬, 형태 변환, 데이터 용량이 작다. 

5. Context를 하나 더 해준 이유는 다음 세가지가 있다. 

5.1. 컴포넌트 독립성 유지: 이미 완성된 게시글 관련 컨텍스트를 유지하면서 댓글 관련 컨텍스트를 추가
5.2. 관심사 분리(SoC): 게시글과 댓글 관련 데이터를 분리해서 코드의 가독성과 유지보수성을 높였다.
5.3. 성능 최적화(Re-Rendering 방지): 댓글 상태가 변할때(추가, 삭제)될때 기존의 다른 게시글들이 불필요하게 재랜더링 되는 것을 방지  

*/

/*
구현할 부분 

1. 이제 개인마다 userId를 부여, 로그인시에 userId에 맞는 mypage 생성 및 랜더링, mypage에서는 내가 쓴글 등을 볼 수 있게 구현 

2. 글마다 userId를 부여, userId와 맞는 것만 수정할 수 있도록 만들어줌. 

3. 댓글 기능 추가. 



*/
