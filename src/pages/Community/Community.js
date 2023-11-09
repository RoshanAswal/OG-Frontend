import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import {Footer} from '../../components/Footer/Footer';
import { Rank } from "../../components/Rank/Rank";
import right from "../../images/right-chevron.png";
import left from "../../images/left-chevron.png";
import { Post } from "../../components/Post/Post";
import postHeading from "../../images/post.png"

import styles from './Community.module.css';

export const Community = () => {
  const [showrank, setShowrank] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [cookies,_]=useCookies(["access_token"]);

  const [title, setTitle] = useState("");
  const [postData, setPostData] = useState("");

  const [filterAuthor,setFilterAuthor]=useState("");
  const [filterTitle,setFilterTitle]=useState("");

  const [rankCapacity,setRankCapacity]=useState(18);
  const [postCapacity,setPostCapacity]=useState(8);
  const userId=window.localStorage.getItem("userId");
  const navigate=useNavigate();

  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [pageno, setPageNo] = useState(0);

  const [posts, setPosts] = useState([]);
  const [totalPostPages, setTotalPostPages] = useState();
  const [postPageNo, setPostPageNo] = useState(0);
  const [section,setSection]=useState('rank');


  const setPage=()=>{
    setTotalPages(Math.ceil(users.length / rankCapacity));
  }
  const setPostPage=()=>{
    setTotalPostPages(Math.ceil(posts.length / postCapacity));
  }

  useEffect(()=>{
    if(cookies.access_token){}
    else{
      if(window.localStorage.getItem("userId")){
        window.localStorage.removeItem("userId");
        window.location.reload();
    }
    }
  },);

  // Fetching the Users data
  useEffect(() => {
    const fetch = async (req, res) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_CONNECTION}auth/ranking`);
        setUsers(response.data);
        // if(users)
        //   setPage();
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  useEffect(()=>{
    if(users)setPage();
  },[users]);

  // Fetching the post data
  const fetch = async (req, res) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_CONNECTION}posts`);
      if(filterAuthor==="" && filterTitle===""){
        setPosts(response.data.reverse());
        if(posts)setPostPage();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch();
  },[]);

  const filterPost=async (e)=>{
    e.preventDefault();
    try {
      const response = await axios.get(`${process.env.REACT_APP_CONNECTION}posts/filtered/${filterAuthor}+/${filterTitle}+`);
      
      if(response.data!==null){
        setPosts(response.data);
        setTotalPostPages(Math.ceil(response.data.length / postCapacity));
      }else{       
        alert("no posts");
        const response = await axios.get(`${process.env.REACT_APP_CONNECTION}posts`);
        setPosts(response.data);
        setPostPage();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.value === "rank") {
      setShowrank(true);
      setSection('rank');
    } else {
      setShowrank(false);
      setSection('post');
    }
  };

  const createPost=async (e)=>{
    e.preventDefault();
    if(!userId)navigate("/register");
    else{
        try{
            await axios.post(`${process.env.REACT_APP_CONNECTION}posts/newPost`,
            {userId,postData,title,headers:cookies.access_token});
            setShowForm(false);
            fetch();
        }catch(err){
            console.log(err);
        }
    }
  }


  if (!users) return <h1>...Loading</h1>;
  return (
    users && (
      <div className={styles.community}>
        {showForm ? (
          <div className={styles.createSection}>
            <div className={styles.formSection}>
              <form onSubmit={(e)=>createPost(e)}>
                <div className={styles.postTitle}>
                  <label htmlFor={styles.title}>Title</label><br />
                  <input
                    type="text"
                    name="title"
                    maxLength="50"
                    placeholder="0/50"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />                
                </div>
                <div className={styles.postDescription}>
                  <label htmlFor="post">Post</label><br /> 
                  <textarea
                    type="text"
                    id="post"
                    name="post"
                    maxLength="1000"
                    placeholder="0/1000"
                    onChange={(e) => setPostData(e.target.value)}
                    value={postData}
                  />
                </div>
                <div className={styles.buttonDiv}>
                  <button id={styles.submit} type="submit">Post</button>
                  <button id={styles.exit} onClick={()=>setShowForm(false)}>Back</button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <Navbar />
            <div className={styles.switchSection}>
              <button id={styles.rankBtn} className={section==='rank'?styles.choosen:''} value="rank" onClick={handleClick}>
                Ranking
              </button>
              <button id={styles.postBtn} className={section==='post'?styles.choosen:''} value="post" onClick={handleClick}>
                Posts
              </button>
            </div>
            {users?"":"Loading"}
            {showrank ? (
              <div className={styles.ranksSection}>
                <div>
                  <Rank
                    users={users.slice(
                      rankCapacity * pageno,
                      rankCapacity * pageno + rankCapacity
                    )}
                    index={rankCapacity * pageno}
                  />
                </div>
                {
                  users.length>=rankCapacity
                  ?
                  <div className={styles.btnControl}>
                    <div>
                      <img className={styles.directionImg} onClick={() => {setPageNo(pageno > 0 ? pageno - 1 : pageno)}} 
                        src={left} alt="left"
                      />
                    </div>

                    <div>
                      <img className={styles.directionImg}                       
                          onClick={() =>
                          {  setPageNo(pageno < totalPages - 1 ? pageno + 1 : pageno)}
                          }
                          src={right} alt="right"
                      />                    
                    </div>
                  </div>
                  :<div></div>
                }

              </div>
            ) : (
              <div className={styles.postSection}>
                <div className={styles.filterSection}>
                  <input id={styles.filter1} placeholder="author" value={filterAuthor} onChange={(e)=>{setFilterAuthor(e.target.value)}}/>
                  <input id={styles.filter2} placeholder="title" value={filterTitle} onChange={(e)=>{setFilterTitle(e.target.value)}}/>
                  <button onClick={(e)=>{filterPost(e)}}>Filter</button>                      
                </div>
                <div>
                  <Post
                    posts={posts.slice(
                      postCapacity * postPageNo,
                      postCapacity * postPageNo + postCapacity
                    )}
                    index={postCapacity * postPageNo}
                  />
                </div>
                {/* <div className={styles.arrowSection}> */}
                  {
                    posts.length>=postCapacity
                    ?
                    <div className={styles.btnControl}>
                    <div>
                      <img src={left} className={styles.directionImg}
                        onClick={() =>
                          {setPostPageNo(postPageNo > 0 ? postPageNo - 1 : postPageNo)}
                        }
                        alt="left"
                      />
                    </div>
                    <div>
                      <img src={right} className={styles.directionImg}
                        onClick={() =>
                          {setPostPageNo(
                            postPageNo < totalPostPages - 1
                              ? postPageNo + 1
                              : postPageNo
                          )}
                        }
                        alt="right"
                      />
                    </div>
                  </div>
                  :<div></div>
                  }

                  <div className={styles.lastSection}>
                    <button onClick={()=>setShowForm(true)}>New Post</button>
                  </div>
                {/* </div>   */}
              </div>
            )}
            <Footer/>
          </div>
        )}
      </div>
    )
  );
};
