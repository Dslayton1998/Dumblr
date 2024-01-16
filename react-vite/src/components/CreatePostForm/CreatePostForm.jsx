import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink ,useNavigate } from "react-router-dom";
import { thunkCreatePost } from "../../redux/post";
import { thunkAllUserBlogs } from "../../redux/blog";
import './CreatePostForm.css'

export default function CreatePostForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [caption, setCaption] = useState("")
    const [image, setImage] = useState("")
    const [blog, setBlog] = useState(0)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationsErrors] = useState({})
    const user = useSelector(state => state.session ? state.session.user : null)
    const blogs= useSelector(state => state.blogs ? Object.values(state.blogs) : null)

    let userBlogs = [];
    blogs.map(blog => {
        if(user != null) {
            if (blog.owner_id == user.id) {
                userBlogs.push(blog)
            }
        }
    })


    useEffect(() => {
        const allBlogs = async () => {
            await dispatch(thunkAllUserBlogs())
        }
        allBlogs()

        const errors = {}

        if(!caption && !image) {
            errors.input = "A caption OR an image must be provided"
        }

        if(caption && caption.length > 2000) {
            errors.input = "Caption must be less than 2000 characters."
        }

        if(caption && caption.length < 4) {
            errors.input = "Caption must be at least 4 characters long."
        }

        if(!blog) {
            errors.blog = "Please select a blog to post to."
        }

        setValidationsErrors(errors)
    }, [dispatch, caption, image, blog])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)

        if (Object.values(validationErrors).length) {
            return;
        }

        const formData = new FormData();
        formData.append("image", image)
        formData.append('caption', caption)
        formData.append('blog_id', Number(blog))
        formData.append('user_id', user.id)

        await dispatch(thunkCreatePost(formData))
        navigate(`/dashboard`)
    }


    if(user == null){
        return (
            <h1>Please sign in to create a post!</h1>
        )
    };

    return (
        <div className="create-post-container">
            <NavLink className="back-button" to={-1}>{'<'}Back</NavLink>
            <h1 className="create-post-heading">Create a new post!</h1>
            <p className="create-required">( * You must add a caption OR an image, and select a blog you wish to post to.)</p>
            <form className="create-post-form" onSubmit={handleSubmit} encType="multipart/form-data">
                <label className="create-post-input">
                    <span className="create-post-span">* Would you like to post with an image?</span>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    />
                </label>

                    <div className="create-post-error-container">
                        {hasSubmitted && validationErrors.input && (
                            <span className="error">{validationErrors.input}</span> )}
                    </div>

                <label className="create-post-input">
                    <span className="create-post-span">* Provide a caption for your post?</span>
                    <textarea
                    className="create-post-text-box"
                    type='text'
                    value={caption}
                    placeholder="What's on your mind?"
                    onChange={(e) => setCaption(e.target.value)}
                    // required
                    />
                </label>


                <label className="create-post-select">
                    <span className="create-post-span">* Select a blog to post to!</span>
                    <select onChange={(e) => setBlog(e.target.value)}>
                    <option value="" disabled selected key="0">Select a blog</option>
                         {userBlogs.map(blog => (
                            <option value={blog.id}>{blog.title}</option>
                        ))}
                    </select>
                    <div className="error-container-select">
                        {hasSubmitted && validationErrors.blog && (
                            <span className="error">{validationErrors.blog}</span> )}
                    </div>
                </label>
                <button className="submit-button" type="submit">Submit</button>
            </form>
        </div>
    )
}