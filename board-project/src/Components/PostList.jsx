import ListItem from "./ListItem";

const PostList = ({filteredData = []})=>{
    return (
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
                    {(filteredData?.length > 0) ? filteredData.map((item)=> {
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
    )
}

export default PostList; 

/*
배운점 

1. Optional Chaining을 이용해서 null이나 undefined경우도 고려가능  

{(filteredData?.length > 0) ? filteredData.map((item)=> {
                        return <ListItem key={item.id} {...item}></ListItem>
                    }) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center", padding: "50px", color: "#94a3b8" }}>
                                검색 결과가 존재하지 않습니다..
                            </td>
                        </tr>
                    )}
이 코드에서 filteredData?.length로 해서 만약 filteredData가 null이나 undefined 경우도 고려해주었다. (Optional Chaining)

2. 아얘 데이터의 default 값을 설정해 줌으로써 부모에서 데이터를 넘겨주지 않거나 하더라도 UX는 해치지 않게 해줄수도 있다. 
여기에서는 filteredData = [] => 이 부분

주의! 디폴트 데이터는 부모가 프롭스를 안 보냈을때만 적용된다. 즉 값이 undefined일때만이다. 하지만 만약 null의 값이 들어온다면 그때는 체이닝으로 방어를 해줘야 한다. 
그래서 실무에서는 이 두 개를 모두 쓴다. (undefined는 값이 아얘 존재하지 않는 것으로 null은 값이 존재하는 것으로 인식)

*/