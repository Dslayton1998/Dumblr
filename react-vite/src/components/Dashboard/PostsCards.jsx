import { NavLink, useNavigate } from "react-router-dom";
import UpdatePost from "./OptionButtons/UpdatePost";
import DeletePost from "./OptionButtons/DeletePost";
import { FaRegHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import Notes from "../Notes/Notes";
import { useState } from "react";
import './PostsCards.css';


export default function PostsCards({ post }) {
    const navigate = useNavigate();
    const [toggleNotes, setToggleNotes] = useState(false);
    const user = useSelector(state => state.session.user);


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

    const addLike = () => {
        // adds a like to the post, state variable to toggle like status (like or unlike)
        //// If not logged-in no like button displays
        // like will be created with users primary blog
        if(user != null) {
            // another if statement to check like status
            return (
            <FaRegHeart />
            )
        }
    }

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
                    {addLike()}
                </div>
                {displayNotes()}
            </div>

        </div>
    )
}