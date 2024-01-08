import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { thunkCreateBlog } from "../../redux/blog";
import './CreateBlogForm.css'

// todo: finish up here!

export default function CreateBlogForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState("")
    const [blogName, setBlogName] = useState("")
    const [profilePicture, setProfilePicture] = useState("")
    const [backgroundImage, setBackgroundImage] = useState("")
    const [publicStatus, setPublicStatus] = useState(true)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationsErrors] = useState({})
    // const user = useSelector(state => state.session ? state.session.user : null)
    // console.log(typeof user.id)

    useEffect(() => {
        const errors = {}

        if(title.length < 4) {
            errors.title = "Title is required and must be at least 4 characters long."
        }

        if(blogName.length < 4) {
            errors.blogName = 'Blog name is required and must be at least 4 characters long.'
        }

        if(!profilePicture || profilePicture?.length < 1) {
            errors.profilePicture = "A profile picture is required."
        }

        if(!backgroundImage || backgroundImage?.length < 1) {
            errors.backgroundImage = "A profile picture is required."
        }

        if(!publicStatus) {
            errors.publicStatus = "Please select a privacy preference for this blog."
        }

        setValidationsErrors(errors)
    }, [title, blogName, profilePicture, backgroundImage, publicStatus])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)

        if (Object.values(validationErrors).length) {
            return;
        }

        // todo: Owner_id is an issue
        const formData = new FormData();
        formData.append("title", title);
        formData.append("blog_name", blogName)
        // formData.append("owner_id", userId)
        formData.append("profile_picture", profilePicture)
        formData.append("background_image", backgroundImage)
        formData.append("primary_blog", false)
        formData.append("public", publicStatus)
        let blog = await dispatch(thunkCreateBlog(formData))
        navigate(`/blog/${blog.id}`)
    }


// todo: implement a default background image, that can be changed during blog update
    return (
        <div className='create-blog-container'>
            <h1 className='create-blog-heading'>Create a new blog!</h1>
            <form className='create-blog-form' onSubmit={handleSubmit} encType="multipart/form-data">
                <label className='create-blog-input'>
                    <span>What is the title of your new blog?</span>
                    <input
                    type='text'
                    value={title}
                    placeholder="Blog Title"
                    onChange={(e) => setTitle(e.target.value)}
                    // required
                    />
                    {hasSubmitted && validationErrors.title && (
                        <span className="error">{validationErrors.title}</span> )}
                </label>


                <label className='create-blog-input'>
                    <span>Provide a handle for your new blog (This is a unique identifier and is how your blog is displayed to other users feeds)</span>
                    <input
                    type='text'
                    value={blogName}
                    placeholder="Blog Name"
                    onChange={(e) => setBlogName(e.target.value)}
                    // required
                    />
                    {hasSubmitted && validationErrors.blogName && (
                        <span className="error">{validationErrors.blogName}</span> )}
                </label>


                <label className='create-blog-input'>
                    <span>Please provide a profile picture for your blog (this can be changed later)</span>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                    />
                    {hasSubmitted && validationErrors.profilePicture && (
                        <span className="error">{validationErrors.profilePicture}</span> )}
                </label>


                <label className='create-blog-input'>
                    <span>Spice up your new blog page with a background image (this can be changed later)</span>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBackgroundImage(e.target.files[0])}
                    />
                    {hasSubmitted && validationErrors.backgroundImage && (
                        <span className="error">{validationErrors.backgroundImage}</span> )}
                </label>


                <label className='create-blog-input'>
                    <span>Is this a public blog (public blogs can be viewed by anyone)</span>
                    <select onChange={(e) => setPublicStatus(e.target.value)}>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                    {hasSubmitted && validationErrors.publicStatus && (
                        <span className="error">{validationErrors.publicStatus}</span> )}
                </label>
                <button className='submit-button' type="submit">Submit</button>
            </form>
        </div>
    )
}