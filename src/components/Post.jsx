import { useNavigate } from "react-router-dom";
import user from '../images/user.png';

export const Post=(props)=>{
    const navigate=useNavigate();

    const GoToPost=async (e,data)=>{
        e.preventDefault();
        window.localStorage.setItem("postId",data._id);
        const win = window.open(`/post/${data._id}`, '_blank');
        if (win != null) {
          win.focus();
        }
        // navigate(`/post/${data._id}`);
    }

    const GoToProfile=(data)=>{
        navigate(`/profile/${data.author}`,{
            state:{
                userId:data.author
            }
        }
        );
    }

    return (
        <div className="postPage">
            <div className="post">
                {props.posts.map((item,key)=>(
                    <div className="postCard" key={item._id}>
                        <div>
                            <img src={item.img?item.img:user} onClick={()=>GoToProfile(item)}/>
                        </div>
                        <div>
                            <h3 onClick={(e)=>GoToPost(e,item)}>{item.title}</h3><br />
                        </div>
                        <div>
                            <button>👍 {item.likes}</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}