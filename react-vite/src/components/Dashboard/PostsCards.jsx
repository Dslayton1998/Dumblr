import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateComment } from "../../redux/post";
import UpdatePost from "./OptionButtons/UpdatePost";
import DeletePost from "./OptionButtons/DeletePost";
import { FaComment } from "react-icons/fa";
import Comments from "./CommentComponents/Comments";
import { useEffect, useState } from "react";
import './PostsCards.css';


export default function PostsCards({ post }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [comment, setComment] = useState("")
    const [selectedBlog, setSelectedBlog] = useState("")
    const [toggleNotes, setToggleNotes] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationsErrors] = useState({})
    const user = useSelector(state => state.session.user)
    const commentsArr = post.comments ? Object.values(post.comments) : null
    const userBlogs = useSelector(state => state.blogs.userBlogs ? Object.values(state.blogs.userBlogs) : null)


    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)

        if (Object.values(validationErrors).length) {
            return;
        }

        const formData = new FormData();
        formData.append("blog_id", Number(selectedBlog));
        formData.append("post_id", post.id);
        formData.append("comment", comment)
        await dispatch(thunkCreateComment(post, formData))

        setComment("")
        setSelectedBlog("")
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

//! Need to give option to create comment under x or y blog
    const displayNotes = () => {
        if(toggleNotes == true) {
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

                    <label>
                        <select value={selectedBlog} onChange={(e) => setSelectedBlog(e.target.value)}>
                            <option>Select a blog</option>
                                {userBlogs ? userBlogs.map(blog => (
                                    <option value={blog.id}>{blog.title}</option>
                                )) : null}
                        </select>
                    </label>

                    <button className='submit-button' type="submit">Create Comment</button>
                </form>

                <div className="comments-container">
                    {commentsArr.map(comment => (
                        <Comments comment={comment} post={post} key={comment.id} />
                    ))}
                </div>

            </div> 
        }
    }

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