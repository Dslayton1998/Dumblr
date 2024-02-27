//todo: Need blog information to give an option to comment under x blog name

import { thunkDeleteComment } from "../../redux/post";
import { useDispatch } from "react-redux";
import UpdateComment from "./UpdateComment";

export default function Comments({ comment, post }) {
    const dispatch = useDispatch();


    const onClick = () => {
        dispatch(thunkDeleteComment(post, comment.id))
    } 
    
    return (
        <div className="comment">
            {comment.comment}
            <button onClick={onClick}>Delete</button>
            <UpdateComment comment={comment} post={post}>Update</UpdateComment>
        </div>
    )
}