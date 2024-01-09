import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { thunkCreatePost } from "../../redux/post";
import { thunkAllUserBlogs } from "../../redux/blog";

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
        if (blog.owner_id == user.id) {
            userBlogs.push(blog)
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


    return (
        <div>
            <h1 >Create a new post!</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label >
                    <span>Provide a caption for your post?</span>
                    <textarea
                    type='text'
                    value={caption}
                    placeholder="What's on your mind?"
                    onChange={(e) => setCaption(e.target.value)}
                    // required
                    />
                    {hasSubmitted && validationErrors.input && (
                        <span className="error">{validationErrors.input}</span> )}
                </label>


                <label>
                    <span>Would you like to add an image to your post?</span>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    />
                    {hasSubmitted && validationErrors.input && (
                        <span className="error">{validationErrors.input}</span> )}
                </label>


                <label >
                    <span>Select a blog to post to!</span>
                    <select onChange={(e) => setBlog(e.target.value)}>
                    <option value="" disabled selected key="0">Select your option</option>
                         {userBlogs.map(blog => (
                            <option value={blog.id}>{blog.title}</option>
                        ))}
                    </select>
                    {hasSubmitted && validationErrors.blog && (
                        <span className="error">{validationErrors.blog}</span> )}
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}