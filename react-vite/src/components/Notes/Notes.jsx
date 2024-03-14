import { thunkCreateComment } from "../../redux/post";
import Comments from "./CommentComponents/Comments";
import { LuSendHorizonal } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Notes({ post }) {
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");
    const [selectedBlog, setSelectedBlog] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [validationErrors, setValidationsErrors] = useState({});
    const commentsArr = post.comments ? Object.values(post.comments) : null;
    const userBlogs = useSelector(state => state.blogs.userBlogs ? Object.values(state.blogs.userBlogs) : null);

    const handleSubmit = async (e) => {
// todo: Set up error validations (can't submit if blog is not selected, max comment length)
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

// todo: state variable that pops up a modal that allows you to pick blog and displays profile picture INSTEAD of select
    return (
        <div className="notes">
                <form className="comment-form" onSubmit={handleSubmit} encType="multipart/form-data">
                    <label>
                        <select className="note-blog-select" value={selectedBlog} onChange={(e) => setSelectedBlog(e.target.value)}>
                            <option>Blog</option>
                                {userBlogs ? userBlogs.map(blog => (
                                    <option key={blog.id} value={blog.id}>{blog.title}</option>
                                )) : null}
                        </select>
                    </label>
                    
                    <label>
                        <input
                        type="text"
                        value={comment}
                        placeholder="Which of your blogs is commenting?"
                        onChange={(e) => setComment(e.target.value)}
                        style={{width: 450}}
                        />
                    </label>

                    <button className='submit-comment' type="submit"><LuSendHorizonal style={{fontSize: "large"}} /></button>
                </form>

                <div className="comments-container">
                    {commentsArr.map(comment => (
                        <Comments comment={comment} post={post} key={comment.id} />
                    ))}
                </div>

            </div> 
    )
}