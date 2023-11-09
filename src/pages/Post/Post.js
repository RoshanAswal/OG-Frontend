import { useNavigate } from "react-router-dom"
import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';
import reply from "../../images/reply.png";
import userDP from "../../images/userDp.png";
import right from "../../images/right-chevron.png";
import left from "../../images/left-chevron.png";
import styles from './Post.module.css';
import like from '../../images/like.png';
import whiteLike from '../../images/whiteLike.png';

export const Post=()=>{
    const navigate=useNavigate();

    const [post,setPost]=useState(null);
    const [comment,setComment]=useState("");
    const [reply,setReply]=useState("");
    const [showReplyBox,setShowReplyBox]=useState(false);
    const [cookies,_]=useCookies(["access_token"]);
    const [postToReply,setPostToReply]=useState('');
    const [deleted,setDeleted]=useState(false);
    const [pageno,setPageNo]=useState(1);
    const [totalPages,setTotalPages]=useState(0);
    let commentCapacity=6;
    const user=window.localStorage.getItem("userId");
    const postId=window.localStorage.getItem("postId");


    const fetchComments=async ()=>{
        try{
            const response=await axios.get(`${process.env.REACT_APP_CONNECTION}posts/${postId}`);
            setPost(response.data);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        if(cookies.access_token){}
        else{
            if(window.localStorage.getItem("userId")){
                window.localStorage.removeItem("userId");
                window.location.reload();
            }
        }
    });

    useEffect(()=>{
        fetchComments();
        if(post)
            setTotalPages(Math.ceil(post.comments.length / commentCapacity));
    },[]);

    useEffect(()=>{
        if(post)
            setTotalPages(Math.ceil(post.comments.length / commentCapacity));
    })

    const handleClick=(id)=>{
        navigate(`/profile/${id}`,{
            state:{
                userId:id
            }
        }
        );
    }

    const deletePost=async (e)=>{
        if(!user)navigate("/register");
        try{
            await axios.put(`${process.env.REACT_APP_CONNECTION}posts/deletePost`,{postId,headers:cookies.access_token});
        
            navigate("/community");
        }catch(err){
            console.log(err);
        }
    }

    const deleteReply=async (e,ind1,ind2)=>{
        e.preventDefault();
        if(!user)navigate("/register");
        try{
            const response=await axios.put(`${process.env.REACT_APP_CONNECTION}posts/deleteReply`,{postId,ind1,ind2,headers:cookies.access_token});
            setPost(response.data);
        }catch(err){
            console.log(err);
        }
    }
    const deleteComment=async (e,ind)=>{
        e.preventDefault();
        if(!user)navigate("/register");
        try{
            const response=await axios.put(`${process.env.REACT_APP_CONNECTION}posts/deleteComment`,{postId,ind,headers:cookies.access_token});
            setPost(response.data);
        }catch(err){
            console.log(err);
        }
    }

    const addComment=async (e)=>{
        e.preventDefault();
        if(!user)navigate("/register");
        try{
            if(comment.length===0)return;
            const response=await axios.put(`${process.env.REACT_APP_CONNECTION}posts/addComment`,
            {postId,userId:user,comment,headers:cookies.access_token});
            setPost(response.data);
            setComment("");
        }catch(err){
            console.log(err);
        }
    }

    const addReply=async (e,reply,ind)=>{
        e.preventDefault();
        if(!user)navigate("/register");
        try{
            if(reply.length===0)return;
            const response=await axios.put(`${process.env.REACT_APP_CONNECTION}posts/addReply`,
            {postId,userId:user,reply,ind,headers:cookies.access_token});
            setPost(response.data);
            setReply("");
        }catch(err){
            console.log(err);
        }
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

    const showReply=(e,ind)=>{
        setShowReplyBox(!showReplyBox);
        setReply("");
        setPostToReply(ind);
    }
    if(!post){
        return (
            <div>Loading...</div>
        )
    }
    return post && (
        <div className={styles.postDetailPage}>
            <Navbar />
            <div className={styles.post}>
                <div className={styles.postTitle}>
                    <h2>{post.title}</h2>
                </div>
                <div className={styles.header}>
                    <div>
                        <img id={styles.userImg} alt="user" src={post.img?post.img:userDP} onClick={(e)=>handleClick(post.author)}/>
                        <h3 id={styles.user}>{post.authorName}</h3>
                        <h3 id={styles.date}>{post.dateOfPost}</h3>
                    </div>
                    <div>
                        <img id={styles.likeImg} src={like} alt="like" onClick={(e)=>addLike(e,"post",-1,-1)}/>
                        <button id={styles.likeBtn}  >
                        {post.likes}</button>
                    </div>
                </div>
                <div className={styles.body}>
                    <p>{post.postData}</p>
                </div>
                {
                    (user && user===post.author)?<button className={styles.delete} onClick={deletePost}>Delete</button>:""
                }
                <div className={styles.commentSection}>
                    <h2 className={styles.commmentHeading}>Comments - </h2>
                    {
                        post.comments.slice(commentCapacity * (pageno-1),
                            commentCapacity * (pageno-1) + commentCapacity).map((item,index)=>(
                        
                            <div className={styles.comment} key={index}>
                                <div className={styles.userDetail}>
                                    <img className={styles.userImg} alt="user" src={item.img?item.img:userDP} onClick={(e)=>handleClick(item.user)}/>
                                    <h3>{item.authorName}</h3>
                                </div>

                                <p>{item.comment}</p>
                                <div className={styles.commentOptions}>
                                    <div className={styles.likeDiv}>
                                        <img src={whiteLike} alt="like" onClick={(e)=>addLike(e,"comment",index,-1)}></img>
                                        <h3>{item.likes}</h3>
                                    </div>

                                    {
                                        (user && user===item.user)?<button className={styles.delete} onClick={(e)=>deleteComment(e,index)}>delete</button>:""
                                    }
                                    <button className={styles.replyBtn} onClick={(e)=>showReply(e,index)}>Reply [{item.replies.length}]</button>
                                </div>
                                {
                                    showReplyBox && postToReply===index
                                    ?<div className={styles.replyBox}>
                                    
                                        {item.replies.map((rep,ind)=>(
                                            <div key={ind}>
                                                <div className={styles.userDetail}>
                                                    <img className={styles.userImg} alt="user" src={rep.img?rep.img:userDP} onClick={(e)=>handleClick(rep.user)}/>
                                                    <h3>{rep.authorName}</h3>
                                                    </div>
                                                <p>{rep.comment}</p>
                                                <div className={styles.commentOptions}>
                                                    <button id={styles.likeBtn} onClick={(e)=>addLike(e,"reply",index,ind)}>👍  {rep.likes}</button>
                                                    {
                                                        (user && user===rep.user)?<button className={styles.delete} onClick={(e)=>deleteReply(e,index,ind)}>delete</button>:""
                                                    }
                                                </div>
                                            </div>
                                        ))}

                                        <form className={styles.commentForm} onSubmit={(e)=>addReply(e,reply,index)}>
                                            <textarea value={reply} onChange={(e)=>setReply(e.target.value)} placeholder="Add a Reply" />
                                            <br/><button type='submit'>comment</button>
                                        </form>
                                    </div>
                                    :""
                                }
                            </div>
                        ))
                    }
                    {
                    post.comments.length>commentCapacity
                    ?
                        <div className={styles.btnControl}>
                            <div>
                            <img alt="left" onClick={() => {setPageNo(pageno > 1 ? pageno - 1 : pageno)}} 
                                src={left}
                            />
                            </div>
                            <div>
                            <input type="number" name="pageNo" value={pageno} onChange={(e)=>{setPageNo(e.target.value)}}/>
                            </div>

                            <div>
                            <img alt="right"                  
                                onClick={() =>
                                {  setPageNo(pageno < totalPages ? pageno + 1 : pageno)}
                                }
                                src={right}
                            />                    
                            </div>
                        </div>
                        :<div></div>
                    }
                    {

                    }
                    <form className={styles.commentForm} onSubmit={(e)=>addComment(e)}>
                        <textarea value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Add a comment"/>
                        <br/><button type="submit">Comment</button>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    )
}