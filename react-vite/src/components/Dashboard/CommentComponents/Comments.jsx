import { thunkDeleteComment } from "../../../redux/post";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UpdateComment from "./UpdateComment";
import './Comment.css';

export default function Comments({ comment, post }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user);

    const onClick = () => {
        dispatch(thunkDeleteComment(post, comment.id))
    }
    
    const goToBlog = () => {
        navigate(`/blog/${comment.blog.id}`)
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

    return (
        <>
            <div className="comment">
                <img className="comment-img" src={comment.blog.profile_picture}/>
                <div className="comment-details">
                    <div>
                        <span onClick={goToBlog} style={{fontWeight: "bold", borderBottom: "solid 1px gray", cursor: "pointer"}}>{comment.blog.blog_name}</span>
                    </div>
                    <span style={{paddingTop: 2}}>{comment.comment}</span>
                </div>

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
*/