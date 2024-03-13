import { thunkDeleteComment } from "../../../redux/post";
import { useDispatch, useSelector } from "react-redux";
import UpdateComment from "./UpdateComment";
import './Comment.css';

export default function Comments({ comment, post }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const onClick = () => {
        dispatch(thunkDeleteComment(post, comment.id))
    }
    
    const userCheck = () => {
        if(user != null && comment != null) {
            if(user.id === comment.blog.owner_id) {
                return (
                <span className="comment-options">
                    <button  style={{marginRight: 5}} onClick={onClick}>Delete</button>
                    <UpdateComment comment={comment} post={post}>Update</UpdateComment>
                </span>
                )
            }
        }
    }
    console.log(comment)
    return (
        <>
            <div className="comment">
                <img className="comment-img" src={comment.blog.profile_picture}/>
                {comment.comment}

            </div>
            
            {userCheck()}

        </>
    )
}


/* 
   todo: Add special indicator if commenter is the Original poster
   todo: * blog select options could be blog profile picture *
        - requires a refactor
        - a pop-up modal that will just change the state variable  
   todo: Submit button is just a "submit-arrow"
*/