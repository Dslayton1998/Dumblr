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
                return  <div>
                    <UpdatePost postId={post.id}/>
                    <DeletePost postId={post.id} />
                </div>
            }
        }
    }
    const onClick = () => {

        return redirect(`/blog/${post.blog_id}`)
    }

    return (
        <div className="post-container">
            <NavLink to={`/blog/${post.blog_id}`}>{post.blog_name}</NavLink>
            {userOptions()}
            {post.image ? <img className="post-image" src={post.image}/> : null}
            <p>{post.caption}</p>
        </div>
    )
}