//todo: Need blog information to give an option to comment under x blog name

import { thunkDeleteComment } from "../../redux/post";
import { useDispatch } from "react-redux";

export default function Comments({ comment, blog }) {
    const dispatch = useDispatch();

    // console.log(comment)


    const onClick = () => {
        dispatch(thunkDeleteComment(comment.id))
    } 
    
    return (
        <div className="comment">
            {comment.comment}
            <button onClick={onClick}>Delete</button>
        </div>
    )
}