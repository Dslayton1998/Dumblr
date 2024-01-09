import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { thunkUpdatePost } from "../../redux/post";
// import './Updatepost.css'

//todo: useState variables should be assigned to target post values

export default function UpdatePost() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postId } = useParams();
    const [image, setImage] = useState("")
    const [caption, setCaption] = useState("")
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationsErrors] = useState({})
    // const user = useSelector(state => state.session ? state.session.user : null)
    // console.log(typeof user.id)

    useEffect(() => {
        const errors = {}

        if(caption && caption.length < 10) {
            errors.caption = "New caption must be at least 10 characters long."
        }

        setValidationsErrors(errors)
    }, [caption])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)

        if (Object.values(validationErrors).length) {
            return;
        }

        const formData = new FormData();
        formData.append('image', image)
        formData.append('caption', caption)
        await dispatch(thunkUpdatePost(Number(postId), formData))
        // navigate(`/post/${postId}`)
    }


// todo: change form depending on if the post has an image 
    return (
        <div>
            <h1>Update your post!</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label>
                    <span>Do you want to change the caption?</span>
                    <input
                    type='text'
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    />
                    {hasSubmitted && validationErrors.caption && (
                        <span className="error">{validationErrors.caption}</span> )}
                </label>


                <label className='post-update-input'>
                    <span>Add an image?</span>
                    <input
                    type="file"
                    accept="image/*"
                    // value={image}
                    onChange={(e) => setImage(e.target.files[0])}
                    />
                    {hasSubmitted && validationErrors.image && (
                        <span className="error">{validationErrors.image}</span> )}
                </label>
                <button className='submit-button' type="submit">Submit</button>
            </form>
        </div>
    )
}