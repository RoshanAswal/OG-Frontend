import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Rank } from "../components/Rank";
import right from "../images/right-chevron.png";
import left from "../images/left-chevron.png";
import { Post } from "../components/Post";
import postHeading from "../images/post.png"

export const Community = () => {
  const [showrank, setShowrank] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [cookies,_]=useCookies(["access_token"]);

  const [title, setTitle] = useState("");
  const [postData, setPostData] = useState("");

  const [filterAuthor,setFilterAuthor]=useState("");
  const [filterTitle,setFilterTitle]=useState("");

  const [rankCapacity,setRankCapacity]=useState(18);
  const [postCapacity,setPostCapacity]=useState(10);
  const userId=window.localStorage.getItem("userId");
  const navigate=useNavigate();

  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [pageno, setPageNo] = useState(0);

  const [posts, setPosts] = useState([]);
  const [totalPostPages, setTotalPostPages] = useState();
  const [postPageNo, setPostPageNo] = useState(0);

  // useEffect(()=>{
  //   let width=window.innerWidth;
  //   if(width<1000){
  //     setPostCapacity(10);
  //   }else{
  //     setPostCapacity(8);
  //   }
  // })

  const setPage=()=>{
    setTotalPages(Math.ceil(users.length / rankCapacity));
  }
  const setPostPage=()=>{
    setTotalPostPages(Math.ceil(posts.length / postCapacity));
  }



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
  }, [users && users.length]);

  useEffect(()=>{
    if(users)setPage();
  },[users && users.length]);

  // Fetching the post data
  useEffect(() => {
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
    fetch();
  }, [posts.length]);

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
    } else {
      setShowrank(false);
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
        }catch(err){
            console.log(err);
        }
    }
  }


  if (!users) return <h1>...Loading</h1>;
  return (
    users && (
      <div className="community">
        {showForm ? (
          <div className="create-section">
            <button id="exit" onClick={()=>setShowForm(false)}>X</button>
            <form onSubmit={(e)=>createPost(e)}>
              <div>
                <label htmlFor="title">Title</label><br />
                <input
                  type="text"
                  name="title"
                  maxLength="50"
                  placeholder="0/50"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />                
              </div>
              <div>
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
              <button id="submit" type="submit">Post</button>
            </form>
          </div>
        ) : (
          <div>
            <Navbar />
            <div className="switch-section">
              <button id="rankBtn" value="rank" onClick={handleClick}>
                Ranking
              </button>
              <button id="postBtn" value="post" onClick={handleClick}>
                Posts
              </button>
            </div>

            {showrank ? (
              <div className="ranks-section">
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
                  <div className="btnControl">
                    <div>
                      <img onClick={() => {setPageNo(pageno > 0 ? pageno - 1 : pageno)}} 
                        src={left}
                      />
                    </div>
                    <div>
                      <input type="number" name="pageNo" value={pageno} onChange={(e)=>{setPageNo(e.target.value)}}/>
                    </div>

                    <div>
                      <img                       
                          onClick={() =>
                          {  setPageNo(pageno < totalPages - 1 ? pageno + 1 : pageno)}
                          }
                          src={right}
                      />                    
                    </div>
                  </div>
                  :<div></div>
                }

              </div>

            ) : (
              <div className="post-section">
                <div className="sec1">
                  <img className="postHeading" src={postHeading} alt="post"/>
                  <div className="filter-section">
                    <input id="filter1" placeholder="author" value={filterAuthor} onChange={(e)=>{setFilterAuthor(e.target.value)}}/>
                    <input id="filter2" placeholder="title" value={filterTitle} onChange={(e)=>{setFilterTitle(e.target.value)}}/>
                    <button onClick={(e)=>{filterPost(e)}}>Filter</button>                      
                  </div>
                  <Post
                    posts={posts.slice(
                      postCapacity * postPageNo,
                      postCapacity * postPageNo + postCapacity
                    )}
                    index={postCapacity * postPageNo}
                  />
                </div>
                <div className="sec2">
                  {
                    posts.length>=postCapacity
                    ?
                    <div className="btnControl">
                      <div>
                        <img src={left} 
                          onClick={() =>
                            {setPostPageNo(postPageNo > 0 ? postPageNo - 1 : postPageNo)}
                          }
                        />
                      </div>
                      <div>
                        <input type="number" name="postPageNo" value={postPageNo} onChange={(e)=>{setPostPageNo(e.target.value)}}/>                    
                      </div>
                      <div>
                        <img src={right}
                          onClick={() =>
                            {setPostPageNo(
                              postPageNo < totalPostPages - 1
                                ? postPageNo + 1
                                : postPageNo
                            )}
                          }
                        />
                      </div>
                    </div>
                    :<div></div>
                  }

                  <div className="lastSection">
                    <button onClick={()=>setShowForm(true)}>New</button>
                  </div>
                </div>  
              </div>
            )}
          </div>
        )}
      </div>
    )
  );
};
