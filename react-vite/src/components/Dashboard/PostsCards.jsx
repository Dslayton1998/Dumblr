export default function PostsCards({ post }) {

    return (
        <div>
            {post.image ? <img src={post.image}/> : null}
            <p>{post.caption}</p>
        </div>
    )
}