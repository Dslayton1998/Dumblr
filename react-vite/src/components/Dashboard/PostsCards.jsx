import { NavLink, useNavigate } from "react-router-dom";
import UpdatePost from "./OptionButtons/UpdatePost";
import DeletePost from "./OptionButtons/DeletePost";
import { useSelector } from "react-redux";
import { useState } from "react";
import './PostsCards.css';
import { FaComment } from "react-icons/fa"

export default function PostsCards({ post }) {
    const navigate = useNavigate();
    const [comment, setComment] = useState("")
    const [toggleNotes, setToggleNotes] = useState(false)
    const user = useSelector(state => state.session.user)
    const commentsArr = post.comments ? Object.values(post.comments) : null

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)

        if (Object.values(validationErrors).length) {
            return;
        }

        const formData = new FormData();
        formData.append("user_id", user.id);
        formData.append("post_id", post.id);
        formData.append("comment", comment)
        let comment = await dispatch()
        // navigate(`/blog/${blog.id}`)
    };

    const userOptions = () => {
        if(user != null) {
            if(post.user_id == user.id) {
                return  <div className="dashboard-user-options">
                    <UpdatePost postId={post.id}/>
                    <DeletePost postId={post.id} />
                </div>
            }
        }
    }

    const onClick = () => {
        navigate(`/blog/${post.blog.id}`)
    }

    const displayNotes = () => {
        if(toggleNotes == true) {
            // todo: Should render a new component with "reply" and "likes" displaying respective functionality
            return  <div className="notes">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <label>
                        <input
                        type="text"
                        value={comment}
                        placeholder="Comment"
                        onChange={(e) => setComment(e.target.value)}
                        />
                    </label>
                    <button className='submit-button' type="submit">Create Comment</button>
                </form>
                {commentsArr.length ? commentsArr[0].comment : null}
            </div> 
        }
    }

// todo: when you click on the notes button (toggle), the PostCard extends and allows you to view AND create posts

    return (
        <div className="post-container">
            <div className="dashboard-blog" onClick={onClick}>
                <div className="dashboard-blog-info">
                    <img className="dashboard-blog-image" src={post.blog.profile_picture} />
                    <NavLink className='dashboard-blog-link' to={`/blog/${post.blog.id}`}>{post.blog.blog_name}</NavLink>
                </div>
                {userOptions()}
            </div>
            {post.image ? <img className="post-image" src={post.image}/> : null}
            <div className="post-caption">{post.caption}</div>


            <div className="notes-container">
                <div className="post-options">
                    <button onClick={() => setToggleNotes(!toggleNotes)}>Notes</button>
                    <FaComment onClick={() => setToggleNotes(!toggleNotes)}/>
                </div>
                {displayNotes()}
            </div>


        </div>
    )
}