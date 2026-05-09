import { useNavigate } from "react-router-dom"
import Like from "./Like";

const Header = ({initData, currentUser, islogin})=>{
    const nav = useNavigate(); 

    return (
        <div className="ui-card detail-container">
            <div className="detail-header">
                <h1 className="detail-title mt-10">{initData.title}</h1>
                <div className="c-light mt-20">
                    <span>{`작성자: ${initData.writer} | ${initData.date}`}</span>
                </div>
            </div>
            <div className="detail-body">
                {initData.content}
            </div>
            <div className="button-section">
                <Like initData={initData} currentUser={currentUser} islogin={islogin}></Like>
                <button className="ui-btn btn-secondary" onClick={()=> nav("/")}>목록</button>
            </div>
        </div>
    )
}

export default Header; 