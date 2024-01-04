import { useNavigate } from "react-router-dom"
import './PostsCards.css'

//todo: AWS bucket it giving 403(forbidden) status

export default function PostsCards({ post }) {
    const redirect = useNavigate();

    const onClick = () => {
    //todo: if blog_name is on post table it will be easier to navigate as we intended ??
        return redirect(`blog/${post.blog_id}`)
    }

    return (
        <div className="post-container" onClick={onClick}>
            {post.image ? <img className="post-image" src={post.image}/> : null}
            <p>{post.caption}</p>
        </div>
    )
}