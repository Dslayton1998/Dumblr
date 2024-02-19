import UpdatePost from "./OptionButtons/UpdatePost";
import DeletePost from "./OptionButtons/DeletePost";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import './PostsCards.css';

export default function PostsCards({ post }) {
    const navigate = useNavigate();
    const [toggleNotes, setToggleNotes] = useState(false)
    const user = useSelector(state => state.session.user)
    const commentsArr = post.comments ? Object.values(post.comments) : null

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
            // todo: Should render a new component with "reply" and "likes" displaying respective functionality
            return  <div>
                {commentsArr.length ? commentsArr[0].comment : null}
            </div> 
        }
    }

// todo: when you click on the notes button (toggle), the PostCard extends and allows you to view AND create posts

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


            <div>
                <button onClick={() => setToggleNotes(!toggleNotes)}>Notes</button>
                <div className="post-options">
                    <button>Reply</button>
                </div>
                {displayNotes()}
            </div>


        </div>
    )
}