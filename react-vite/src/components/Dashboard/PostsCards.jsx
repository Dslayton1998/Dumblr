import { thunkCreateLike, thunkDeleteLike } from "../../redux/likes";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UpdatePost from "./OptionButtons/UpdatePost";
import DeletePost from "./OptionButtons/DeletePost";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Notes from "../Notes/Notes";
import { useState } from "react";
import './PostsCards.css';


export default function PostsCards({ post }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [numLikes, setNumLikes] = useState(post.likes.length);
    const [toggleNotes, setToggleNotes] = useState(false);
    const [liked, setLikedStatus] = useState(false);
    const userBlogs = useSelector(state => state.blogs.userBlogs);
    const user = useSelector(state => state.session.user);
    const likes = post.likes
    let primaryBlog;
    for (const blog in userBlogs) {
        if(userBlogs[blog].primary_blog == true) {
            primaryBlog = userBlogs[blog]
        }
    }
    // console.log(userBlogs)
    // console.log(likes)

    
        for(let like in likes){
            console.log(likes[like])
        }
    

//todo: Select the like using the post and the users primary blog

        const addLike = async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append("post_id", post.id)
            formData.append("blog_id", primaryBlog.id)
            await dispatch(thunkCreateLike(post, formData))
    
            setLikedStatus(!liked)
            setNumLikes(numLikes + 1);
        }

        const removeLike = async () => {
            post.likes

          await dispatch(thunkDeleteLike())
          setLikedStatus(!liked)
          setNumLikes(numLikes - 1);
        }
//! currently just wants to keep creating likes and never delete

    const toggleLike = () => {
        // todo: currently just changing the display 
        if(user != null) {
            if(liked === true) {
                return (<FaHeart onClick={removeLike}/>)
            } else {
                return (<FaRegHeart onClick={addLike}/>)
            }
        }
    }

    const userOptions = () => {
        if(user != null) {
            if(post.user_id == user.id) {
                return  <div className="dashboard-user-options">
                    <UpdatePost postId={post.id}/>
                    <DeletePost postId={post.id} />
                </div>
            }
        }
    }

    const onClick = () => {
        navigate(`/blog/${post.blog.id}`)
    }


    const displayNotes = () => {
        if(toggleNotes == true) {
            return <Notes post={post}/>
        }
    }

// toggleLike could just return like component after logic is figured out
    return (
        <div className="post-container">
            <div className="dashboard-blog" onClick={onClick}>
                <div className="dashboard-blog-info">
                    <img className="dashboard-blog-image" src={post.blog.profile_picture} />
                    <NavLink className='dashboard-blog-link' to={`/blog/${post.blog.id}`}>{post.blog.blog_name}</NavLink>
                </div>
                {userOptions()}
            </div>

            {post.image ? <img className="post-image" src={post.image}/> : null}
            <div className="post-caption">{post.caption}</div>


            <div className="notes-container">
                <div className="note-options">
                    <div className="notes-button" onClick={() => setToggleNotes(!toggleNotes)}>Notes</div>
                    <FaComment className="comment-icon" onClick={() => setToggleNotes(!toggleNotes)}/>
                    {toggleLike()}
                </div>
                {displayNotes()}
            </div>

        </div>
    )
}