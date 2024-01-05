//todo: AWS bucket it giving 403(forbidden) status

export default function Posts({ post }) {

    return (
        <div className="post-container">
            {post.image ? <img className="post-image" src={post.image}/> : null}
            <p>{post.caption}</p>
        </div>
    )
}