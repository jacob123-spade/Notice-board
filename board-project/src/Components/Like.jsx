import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BoardDispatchContext } from "./Context";

const Like = ({currentUser, initData, islogin})=>{
    const [isLiked, setIsLiked] = useState(initData.likedUsers.includes(currentUser)); 
    //좋아요를 누른 user관리 리스트 
    const [likedUsersLst, setLikedUsersLst] = useState([...initData.likedUsers]); 
    let [likeCount, setLikeCount] = useState(initData.numRecommend); 
    const nav = useNavigate(); 
    const {onUpdate} = useContext(BoardDispatchContext); 

    const onLikeClick = ()=>{
        if(!islogin){
            alert("로그인 후에 이용 가능합니다."); 
            nav("/login"); 
            return; 
        }

        const nextIsLiked = !isLiked; 
        const nextLikeCount = isLiked ? likeCount-1 : likeCount+1;
        const nextLikedUsers = isLiked ? likedUsersLst.filter((user)=> user !==currentUser) : [...likedUsersLst, currentUser]; 

        setIsLiked(nextIsLiked); 
        setLikeCount(nextLikeCount); 
        setLikedUsersLst(nextLikedUsers); 

        //여기에 변수로 next값들을 넣어주는 이유는 useState는 상태를 바로 바꾸지 않고 예약해주는 역할을 하기 때문에(데이터 비동기처리) 이걸 곧바로 바꿔주기 위함이다. 
        const updatedData = {
            ...initData, 
            numRecommend: nextLikeCount,
            likedUsers: nextLikedUsers, 
        }

        onUpdate(updatedData); 
    }

    return (
        <div className="recommend-section">
            <button 
                className={`recommend-btn ${(isLiked && currentUser && likedUsersLst.includes(currentUser)) ? "active" : ""}`} 
                onClick={onLikeClick}>
                <span className="thumb-icon">👍</span>
                <span className="recommend-label">추천</span>
                <span className="recommend-count">{likeCount}</span>
            </button>
        </div>
    )
}

export default Like; 