import { thunkDeleteComment } from "../../../redux/post";
import { useDispatch } from "react-redux";
import UpdateComment from "./UpdateComment";
import './Comment.css';

export default function Comments({ comment, post }) {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(thunkDeleteComment(post, comment.id))
    } 

    return (
        <div className="comment">
            <img className="comment-img" src={comment.blog.profile_picture}/>
            {comment.comment}
            <button onClick={onClick}>Delete</button>
            <UpdateComment comment={comment} post={post}>Update</UpdateComment>
        </div>
    )
}


/* 
   todo: Add special indicator if commenter is the Original poster
   todo: * blog select options could be blog profile picture * 
   todo: Submit button is just a "submit-arrow"
*/