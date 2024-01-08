import { useSelector } from "react-redux"
import DeletePost from "./PostOptions/DeletePost"

export default function Posts({ post }) {
    const user = useSelector(state => state.session.user)
    
    const userOptions = () => {
        if(post.user_id == user.id) {
            return  <div>
                {/* <UpdatePost /> */}
                <DeletePost postId={post.id} />
            </div>
        }
    }
    console.log(user)
    return (
        <div className="post-container">
            {userOptions()}
            {post.image ? <img className="post-image" src={post.image}/> : null}
            <p>{post.caption}</p>
        </div>
    )
}