import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
export const Reply=(props)=>{
    const [cookies,_]=useCookies(["access_token"]);

    const user=window.localStorage.getItem("userId");
    const postId=window.localStorage.getItem("postId");
    const navigate=useNavigate();
    const handleClick=(id)=>{
        navigate(`/profile/${id}`,{
            state:{
                userId:id
            }
        }
        );
    }
    const addLike=async (e,type,ind1,ind2)=>{{
        e.preventDefault();
        try{
            const response=await axios.put(`${process.env.REACT_APP_CONNECTION}posts/addLike`,
            {postId,ind1,ind2,type,userId:user,headers:cookies.access_token});
            setPost(response.data);
        }catch(err){
            console.log(err);
        }
    }};
    return (
        <div>
            <div className="userDetail">
                <img className="userImg" src={props.img?props.img:userDP} onClick={(e)=>handleClick(props.user)}/>
                <h3>{props.authorName}</h3>
            </div>
            <p>{props.comment}</p>
            <div className="commentOptions">
                <button id="likeBtn" onClick={(e)=>addLike(e,"reply",index,ind)}>👍  {props.likes}</button>
                {
                    (user && user===props.user)?<button className="delete" onClick={(e)=>deleteReply(e,index,ind)}>delete</button>:""
                }
            </div>
        </div>
    )
}