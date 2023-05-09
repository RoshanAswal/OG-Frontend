import { useNavigate } from "react-router-dom"
import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { Navbar } from '../components/Navbar';
import reply from "../images/reply.png";
import userDP from "../images/user.png";

export const Post=()=>{
    const navigate=useNavigate();

    const [post,setPost]=useState(null);
    const [comment,setComment]=useState("");
    const [reply,setReply]=useState("");
    const [showReplyBox,setShowReplyBox]=useState(false);
    const [cookies,_]=useCookies(["access_token"]);
    const [postToReply,setPostToReply]=useState('');
    const [deleted,setDeleted]=useState(false);
    const user=window.localStorage.getItem("userId");
    const postId=window.localStorage.getItem("postId");
    const deletedUser=[];
    const fetchComments=async ()=>{
        try{
            const response=await axios.get(`${process.env.REACT_APP_CONNECTION}posts/${postId}`);
            const res=await axios.get(`${process.env.REACT_APP_CONNECTION}profile/${response.data.author}`,{headers:cookies.access_token});
            if(res.data==="not found")setDeleted(true);
            for(const comment of response.data.comments){
                const res=await axios.get(`${process.env.REACT_APP_CONNECTION}profile/${comment.user}`,{headers:cookies.access_token});
                if(res.data==="not found")deletedUser.push(comment.user);
                for(const repli of comment.replies){
                    const res=await axios.get(`${process.env.REACT_APP_CONNECTION}profile/${repli.user}`,{headers:cookies.access_token});
                    if(res.data==="not found")deletedUser.push(repli.user);
                }
            }
            setPost(response.data);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchComments();
    },[]);

    const checkUserExists = async (userId) => {
        try {
            const res=await axios.get(`${process.env.REACT_APP_CONNECTION}profile/${userId}`,{headers:cookies.access_token});
            if(res.data==="not found"){
                return false;
            }else return true;
        } catch (error) {
            console.log(error);
            return false;
        }
      };

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
        <div className="postDetailPage">
            <Navbar />
            <div className="post">
                <div className="header">
                    <img id="userImg" src={post.img?post.img:userDP} onClick={(e)=>handleClick(post.author)}/>
                    <h2>{post.title}</h2>

                    {deleted
                    ?<h3 id="user">deleted User</h3>
                    :<h3 id="user">{post.authorName}</h3>
                    }

                    <div>
                        <h3 id="date">{post.dateOfPost}</h3>
                        <button id="likeBtn" onClick={(e)=>addLike(e,"post",-1,-1)} >👍 {post.likes}</button>
                    </div>
                </div>
                <p className="body">{post.postData}</p>
                {
                    (user && user===post.author)?<button className="delete" onClick={deletePost}>Delete</button>:""
                }
                <div className="commentSection">
                    <h2 className="commment-heading">Comments - </h2>
                    {
                        post.comments.map((item,index)=>(
                            <div className="comment" key={index}>
                                <div className="userDetail">
                                    <img className="userImg" src={item.img?item.img:userDP} onClick={(e)=>handleClick(item.user)}/>
                                    {deletedUser.includes(item.user)
                                    ?<h3>deleted User</h3>
                                    :<h3>{item.authorName}</h3>
                                    }

                                </div>
                                <p>{item.comment}</p>
                                <div className="commentOptions">
                                    <button id="likeBtn" onClick={(e)=>addLike(e,"comment",index,-1)}>👍  {item.likes}</button>
                                    {
                                        (user && user===item.user)?<button className="delete" onClick={(e)=>deleteComment(e,index)}>delete</button>:""
                                    }
                                    <button className="replyBtn" onClick={(e)=>showReply(e,index)}>Reply [{item.replies.length}]</button>
                                </div>
                                {
                                    showReplyBox && postToReply===index
                                    ?<div className="replyBox">
                                    
                                        {item.replies.map((rep,ind)=>(
                                            <div key={ind}>
                                                <div className="userDetail">
                                                    <img className="userImg" src={rep.img?rep.img:userDP} onClick={(e)=>handleClick(rep.user)}/>
                                                    {deletedUser.includes(rep.user)
                                                    ?<h3>deleted User</h3>
                                                    :<h3>{rep.authorName}</h3>
                                                    }
                                                 </div>
                                                <p>{rep.comment}</p>
                                                <div className="commentOptions">
                                                    <button id="likeBtn" onClick={(e)=>addLike(e,"reply",index,ind)}>👍  {rep.likes}</button>
                                                    {
                                                        (user && user===rep.user)?<button className="delete" onClick={(e)=>deleteReply(e,index,ind)}>delete</button>:""
                                                    }
                                                </div>
                                            </div>
                                        ))}

                                        <form className="commentForm" onSubmit={(e)=>addReply(e,reply,index)}>
                                            <textarea value={reply} onChange={(e)=>setReply(e.target.value)} placeholder="Add a Reply" />
                                            <br/><button type="submit">comment</button>
                                        </form>
                                    </div>
                                    :""
                                }
                            </div>
                        ))
                    }
                    <form className="commentForm" onSubmit={(e)=>addComment(e)}>
                        <textarea value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Add a comment"/>
                        <br/><button type="submit">Comment</button>
                    </form>
                </div>
            </div>

        </div>
    )
}