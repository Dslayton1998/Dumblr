import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import UpdatePost from "./OptionButtons/UpdatePost";
import DeletePost from "./OptionButtons/DeletePost";
import { useState } from "react";
import './PostsCards.css';

export default function PostsCards({ post }) {
    const [toggleNotes, setToggleNotes] = useState(false)
    const user = useSelector(state => state.session.user)
    // console.log(post)
    const commentsArr = Object.values(post.comments)
    console.log(commentsArr)

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
            return ( <div>
                {commentsArr.length ? commentsArr[0].comment : null}
            </div> )
        }
    }

// todo: when you click on the notes button (toggle), the PostCard extends and allows you to view AND create posts

    return (
        <div className="post-container">
            <div className="dashboard-blog">
                <div className="dashboard-blog-info">
                    <img className="dashboard-blog-image" src={post.blog.profile_picture} />
                    <NavLink className='dashboard-blog-link' to={`/blog/${post.blog.id}`}>{post.blog.blog_name}</NavLink>
                </div>
                {userOptions()}
            </div>
            {post.image ? <img className="post-image" src={post.image}/> : null}
            <div className="post-caption">{post.caption}</div>


            <div>
                <button onClick={(e) => setToggleNotes(true)}>Notes</button>
                {displayNotes()}
            </div>


        </div>
    )
}