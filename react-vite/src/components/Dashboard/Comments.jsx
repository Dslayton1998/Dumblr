//todo: take functionality from PostCards to clean up code and render all comments

import { useDispatch } from "react-redux"
import { thunkDeleteComment } from "../../redux/post";

export default function Comments( comment ) {
    const dispatch = useDispatch();

    const commentObj = comment.comment


    const onClick = () => {
        dispatch(thunkDeleteComment(commentObj.id))
    } 
    
    return (
        <div className="comment">
        {commentObj.comment}
        <button onClick={onClick}>Delete</button>
        </div>
    )
}