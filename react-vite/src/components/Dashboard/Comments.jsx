//todo: take functionality from PostCards to clean up code and render all comments

import { useDispatch } from "react-redux"
import { thunkDeleteComment } from "../../redux/post";

export default function Comments({ comment, blog }) {
    const dispatch = useDispatch();

    console.log(comment)

    const onClick = () => {
        dispatch(thunkDeleteComment(commentObj.id))
    } 
    
    return (
        <div className="comment">
        {comment.comment}
        <button onClick={onClick}>Delete</button>
        </div>
    )
}