import DeletePost from "./PostOptions/DeletePost";
import UpdatePost from "./PostOptions/UpdatePost";
import { FaComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import Notes from "../Notes/Notes";
import { useState } from "react";
import './Posts.css';

export default function Posts({ post }) {
    const [toggleNotes, setToggleNotes] = useState(false);
    const user = useSelector(state => state.session.user)
    
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

    const displayNotes = () => {
        if(toggleNotes == true) {
            return <Notes post={post}/>
        }
    }
    console.log(post)
    return (
        <div className="post-container">
            <div className="blog-page-heading">
                <div className="dashboard-blog-info">
                    <img className="dashboard-blog-image" src={post.blog.profile_picture} />
                    <div className='blog-page-blog-link' to={`/blog/${post.blog.id}`}>{post.blog.blog_name}</div>
                </div>
                {userOptions()}
            </div>

            {post.image ? <img className="post-image" src={post.image}/> : null}
            <p className="post-caption">{post.caption}</p>

            <div className="notes-container">
                <div className="note-options">
                    <div className="notes-button" onClick={() => setToggleNotes(!toggleNotes)}>Notes</div>
                    <FaComment className="comment-icon" onClick={() => setToggleNotes(!toggleNotes)}/>
                </div>
                {displayNotes()}
            </div>
        </div>
    )
}