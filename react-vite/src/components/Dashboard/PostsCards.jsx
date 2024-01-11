import { NavLink, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import './PostsCards.css'
import UpdatePost from "./OptionButtons/UpdatePost";
import DeletePost from "./OptionButtons/DeletePost";

export default function PostsCards({ post }) {
    const redirect = useNavigate();
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

    return (
        <div className="post-container">
            <div className="dashboard-blog-info">
                <img className="dashboard-blog-image" src={post.blog.profile_picture} />
                <NavLink to={`/blog/${post.blog.id}`}>{post.blog.blog_name}</NavLink>
                {userOptions()}
            </div>
            {post.image ? <img className="post-image" src={post.image}/> : null}
            <p>{post.caption}</p>
        </div>
    )
}