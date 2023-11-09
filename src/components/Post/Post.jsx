import { useNavigate } from "react-router-dom";
import user from '../../images/userDp.png';
import likes from '../../images/like.png';
import styles from './Post.module.css';

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
        <div className={styles.post}>
            {props.posts.map((item,key)=>(
                <div className={styles.postCard} key={item._id}>
                    <div className={styles.userImg}>
                        <img src={item.img?item.img:user} alt="user" onClick={()=>GoToProfile(item)}/>
                    </div>
                    <div className={styles.postHeading}>
                        <h3 onClick={(e)=>GoToPost(e,item)}>{item.title}</h3><br />
                    </div>
                    <div className={styles.detail}>
                        <img src={likes} alt="likes"/>
                        <span>{item.likes}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}