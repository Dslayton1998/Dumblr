import { useSelector } from "react-redux"
import DeletePost from "./PostOptions/DeletePost"
import UpdatePost from "./PostOptions/UpdatePost"
import '../Dashboard/PostsCards.css';

export default function Posts({ post }) {
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
            <div className="dashboard-blog">
                <div className="dashboard-blog-info">
                    <img className="dashboard-blog-image" src={post.blog.profile_picture} />
                    <div className='blog-page-blog-link' to={`/blog/${post.blog.id}`}>{post.blog.blog_name}</div>
                </div>
                {userOptions()}
            </div>
            {post.image ? <img className="post-image" src={post.image}/> : null}
            <p className="post-caption">{post.caption}</p>
        </div>
    )
}