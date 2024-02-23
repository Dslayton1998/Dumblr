//todo: take functionality from PostCards to clean up code and render all comments

export default function Comments( comment ) {
    const commentObj = comment.comment

    return (
        <div className="comment">
        {commentObj.comment}
        </div>
    )
}