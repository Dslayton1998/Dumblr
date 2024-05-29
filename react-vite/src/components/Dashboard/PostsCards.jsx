import { thunkCreateLike, thunkDeleteLike } from "../../redux/likes";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UpdatePost from "./OptionButtons/UpdatePost";
import DeletePost from "./OptionButtons/DeletePost";
// import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Notes from "../Notes/Notes";
import { useState } from "react";
import './PostsCards.css';

// todo: Likes are working, get likes to persist, and refactor
export default function PostsCards({ post }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [numLikes, setNumLikes] = useState(Object.values(post.likes).length);
    const [toggleNotes, setToggleNotes] = useState(false);
    const user = useSelector(state => state.session.user);
    const likes = useSelector(state => state.likes)

    let currLike;
    if(user != null) {
        for(const like in likes) {
            if(likes[like].post_id == post.id) {
                currLike = likes[like]
            }
        }
    }

    const addLike = async (e) => {
         e.preventDefault();
        const formData = new FormData();
        formData.append("post_id", post.id)
        formData.append("blog_id", user.primaryBlog.id)
        await dispatch(thunkCreateLike(post, formData))
    
        setNumLikes(numLikes + 1);
    }

    const removeLike = async (e) => {
        e.preventDefault();
        await dispatch(thunkDeleteLike(post.id, currLike.id))

        setNumLikes(numLikes - 1);
    }

    const toggleLike = () => {
        if(user != null) {
            if(likes[post.id] != undefined) {
                // console.log('HAS VALUE')
                return <><FaHeart onClick={removeLike}/> {numLikes} </>
            } else {
                // console.log('HAS NO VALUE')
                return <><FaRegHeart onClick={addLike}/> {numLikes} </>
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