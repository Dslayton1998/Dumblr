import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { thunkUpdateBlog } from "../../redux/blog";
import './UpdateBlog.css'


export default function UpdateBlog() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { blogId } = useParams();
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

        if(title && title.length < 4) {
            errors.title = "New title must be at least 4 characters long."
        }

        setValidationsErrors(errors)
    }, [title, profilePicture, backgroundImage, publicStatus])

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


// todo: implement a default background image, that can be changed during blog update
    return (
        <div className="blog-update-container">
            <h1 className='blog-update-heading'>Update your blog!</h1>
            <form className='blog-update-form' onSubmit={handleSubmit} encType="multipart/form-data">
                <label className='blog-update-input'>
                    <span>Do you want to change your blog title?</span>
                    <input
                    type='text'
                    value={title}
                    placeholder="Blog Title"
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    {hasSubmitted && validationErrors.title && (
                        <span className="error">{validationErrors.title}</span> )}
                </label>


                <label className='blog-update-input'>
                    <span>Set a new profile picture?</span>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                    />
                    {hasSubmitted && validationErrors.profilePicture && (
                        <span className="error">{validationErrors.profilePicture}</span> )}
                </label>


                <label className='blog-update-input'>
                    <span>Do you want to change your blogs background image?</span>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBackgroundImage(e.target.files[0])}
                    />
                    {hasSubmitted && validationErrors.backgroundImage && (
                        <span className="error">{validationErrors.backgroundImage}</span> )}
                </label>


                <label className='blog-update-input'>
                    <span>Ready to share your blog with other users?</span>
                    <select className='blog-update-select' onChange={(e) => setPublicStatus(e.target.value)}>
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