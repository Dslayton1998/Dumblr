import { NavLink ,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateBlog } from "../../redux/blog";
import { useEffect, useState } from "react";
import './CreateBlogForm.css';

export default function CreateBlogForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState("")
    const [blogName, setBlogName] = useState("")
    const [profilePicture, setProfilePicture] = useState("")
    const [backgroundImage, setBackgroundImage] = useState("")
    const [publicStatus, setPublicStatus] = useState("")
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationsErrors] = useState({})
    const user = useSelector(state => state.session ? state.session.user : null)

    useEffect(() => {
        const errors = {}

        if(title.length < 4) {
            errors.title = "Title is required and must be at least 4 characters long."
        }

        if (title.length > 50) {
            errors.title = "Title must be less than 50 characters."
        }

        if(blogName.length < 4) {
            errors.blogName = 'Blog name is required and must be at least 4 characters long.'
        }

        if(blogName.length > 50) {
            errors.blogName = 'Blog name must be less than 50 characters.'
        }


        if(!profilePicture || profilePicture?.length < 1) {
            errors.profilePicture = "A profile picture is required."
        }

        if(!backgroundImage || backgroundImage?.length < 1) {
            errors.backgroundImage = "A background image is required."
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

        const formData = new FormData();
        formData.append("title", title);
        formData.append("blog_name", blogName)
        formData.append("owner_id", user.id)
        formData.append("profile_picture", profilePicture)
        formData.append("background_image", backgroundImage)
        formData.append("primary_blog", false)
        formData.append("public", publicStatus)
        let blog = await dispatch(thunkCreateBlog(formData))
        navigate(`/blog/${blog.id}`)
    };


    if(user == null){
        return (
            <h1>Please sign in to create a blog!</h1>
        )
    }

    return (
        <div className='create-blog-container'>
            <NavLink className="back-button" to={-1}>{'<'} Back</NavLink>
            <h1 className='create-blog-heading'>Create a new blog!</h1>
            <p className="create-required">( Please fill out *ALL entry fields.)</p>
            <form className='create-blog-form' onSubmit={handleSubmit} encType="multipart/form-data">

                <label className='create-blog-input'>
                    <span className="create-blog-span">* What is the title of your new blog?</span>
                    <input
                    type='text'
                    value={title}
                    placeholder="Blog Title"
                    style={{'border': 'solid 2px white'}}
                    onChange={(e) => setTitle(e.target.value)}
                    // required
                    />

                    <div className="create-blog-error-container">
                        {hasSubmitted && validationErrors.title && (
                            <span className="error">{validationErrors.title}</span> )}
                    </div>
                </label>


                <label className='create-blog-input'>
                    <span className="create-blog-span">* Provide a handle for your new blog! (This is how your blog is displayed on other users feeds)</span>
                    <input
                    type='text'
                    value={blogName}
                    placeholder="Blog Name"
                    style={{'border': 'solid 2px white'}}
                    onChange={(e) => setBlogName(e.target.value)}
                    // required
                    />

                    <div className="create-blog-error-container">
                        {hasSubmitted && validationErrors.blogName && (
                            <span className="error">{validationErrors.blogName}</span> )}
                    </div>
                </label>


                <label className='create-blog-input'>
                    <span className="create-blog-span">* Please provide a profile picture for your blog! (this can be changed later)</span>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                    />

                    <div className="create-blog-error-container">
                        {hasSubmitted && validationErrors.profilePicture && (
                            <span className="error">{validationErrors.profilePicture}</span> )}
                    </div>
                </label>


                <label className='create-blog-input'>
                    <span className="create-blog-span">* Spice up your new blog page with a background image! (this can be changed later)</span>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBackgroundImage(e.target.files[0])}
                    />

                    <div className="create-blog-error-container">
                        {hasSubmitted && validationErrors.backgroundImage && (
                            <span className="error">{validationErrors.backgroundImage}</span> )}
                    </div>
                </label>


                <label className='create-blog-input'>
                    <span className="create-blog-span">* Is this a public blog? (public blogs can be viewed by anyone)</span>
                    <select className="create-select-option" style={{'border': 'solid 2px white'}} onChange={(e) => setPublicStatus(e.target.value)}>
                        <option value="" disabled selected key='0'>Select an option</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>

                    <div className="create-blog-error-container">
                        {hasSubmitted && validationErrors.publicStatus && (
                            <span className="error">{validationErrors.publicStatus}</span> )}
                    </div>
                </label>

                <button className='submit-button' type="submit">Submit</button>
                
            </form>
        </div>
    )
}