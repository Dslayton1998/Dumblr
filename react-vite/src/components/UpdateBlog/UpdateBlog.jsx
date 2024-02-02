import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { thunkOneBlog, thunkUpdateBlog } from "../../redux/blog";
import './UpdateBlog.css'


export default function UpdateBlog() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { blogId } = useParams();
    const blog = useSelector(state => state?.blogs[blogId])
    const [title, setTitle] = useState(blog ? blog.title : "")
    const [profilePicture, setProfilePicture] = useState(blog ? blog.profile_picture : "")
    const [backgroundImage, setBackgroundImage] = useState(blog ? blog.background_image : "")
    const [publicStatus, setPublicStatus] = useState(blog ? blog.public : true)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationsErrors] = useState({})

    useEffect(() => {
        const getBlog = async () => {
            const blog = await dispatch(thunkOneBlog(blogId))
            setTitle(blog.title)
            setProfilePicture(blog.profile_picture)
            setBackgroundImage(blog.background_image)
            setPublicStatus(blog.public)
        }
        getBlog()
    }, [dispatch, blogId])

    useEffect(() => {
        const errors = {}

        if(title.length < 4) {
            errors.title = "New title must be at least 4 characters long."
        }

        if (title.length > 50) {
            errors.title = "New title must be less than 50 characters."
        }

        setValidationsErrors(errors)
    }, [title])

    const selectValue = () => {
        if(blog != null) {
            if(blog.public == false) {
                return "No"
            } else {
                return "Yes"
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)

        if (Object.values(validationErrors).length) {
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("profile_picture", profilePicture)
        formData.append("background_image", backgroundImage)
        formData.append("public", publicStatus)
        await dispatch(thunkUpdateBlog(Number(blogId), formData))
        navigate(`/blog/${blogId}`)
    }

    return (
        <div className="blog-update-container">
            <NavLink className="back-button" to={-1}>{'<'} Back</NavLink>
            <h1 className='blog-update-heading'>Update your blog!</h1>
            <form className='blog-update-form' onSubmit={handleSubmit} encType="multipart/form-data">
                <label className='blog-update-input'>
                    <span className="update-blog-span">Do you want to change your blog title?</span>
                    <input
                    type='text'
                    value={title}
                    placeholder="Blog Title"
                    style={{'border': 'solid 2px white'}}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="blog-update-error-container">
                        {hasSubmitted && validationErrors.title && (
                            <span className="error">{validationErrors.title}</span> )}
                    </div>
                </label>


                <label className='blog-update-input'>
                    <span className="update-blog-span">Would you like to set a new profile picture?</span>
                    <input
                    type="file"
                    accept="image/*"
                    src={profilePicture}
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                    />
                    <div className="blog-update-error-container">
                        {hasSubmitted && validationErrors.profilePicture && (
                            <span className="error">{validationErrors.profilePicture}</span> )}
                    </div>
                </label>


                <label className='blog-update-input'>
                    <span className="update-blog-span">Do you want to change this blogs background image?</span>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBackgroundImage(e.target.files[0])}
                    />
                    <div className="blog-update-error-container">
                        {hasSubmitted && validationErrors.backgroundImage && (
                            <span className="error">{validationErrors.backgroundImage}</span> )}
                    </div>
                </label>


                <label className='blog-update-input'>
                    <span className="update-blog-span">Share your blog with other users?</span>
                    <select className='blog-update-select' style={{'border': 'solid 2px white'}} onChange={(e) => setPublicStatus(e.target.value)}>
                        <option>{selectValue()}</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                    <div className="blog-update-error-container">
                        {hasSubmitted && validationErrors.publicStatus && (
                            <span className="error">{validationErrors.publicStatus}</span> )}
                    </div>
                </label>
                <button className='submit-button' type="submit">Submit</button>
            </form>
        </div>
    )
}