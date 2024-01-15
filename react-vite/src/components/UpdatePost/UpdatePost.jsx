import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { thunkOnePost, thunkUpdatePost } from "../../redux/post";
import './UpdatePost.css'

export default function UpdatePost() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postId } = useParams();
    const post = useSelector(state => state?.posts[postId])
    const [image, setImage] = useState(post ? post.image : "")
    const [caption, setCaption] = useState(post ? post.caption : "")
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationsErrors] = useState({})

    useEffect(() => {
    // For populating values into update form
        const getPost = async () => {
          const post = await dispatch(thunkOnePost(postId))
          setCaption(post.caption)
          setImage(post.image)
        }
        getPost()
    }, [dispatch, postId]);

    useEffect(() => {
    // For error validations
        const errors = {}

        if(caption && caption.length < 10) {
            errors.caption = "New caption must be at least 10 characters long."
        }

        if(caption && caption.length > 2000) {
            errors.caption = "New caption must be less than 2000 characters."
        }

        setValidationsErrors(errors)
    }, [dispatch, caption]);

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
        navigate(-1) // -1
    };

    const disableButton = () => {
        if((image == "" && caption == "") || (image == post.image && caption == post.caption)) {
            return <button className='disabled' type="submit">Submit</button>
        } else {
           return <button className='submit-button' type="submit">Submit</button>
        }
    }

    return (
        <div className="post-update-container">
            <NavLink className="back-button" to={-1}>{'<'}Back</NavLink>
            <h1 className="post-update-heading">Update your post!</h1>
            <form className="post-update-form" onSubmit={handleSubmit} encType="multipart/form-data">
                <label className="post-update-input">
                    <span className="post-update-span">Do you want to change the caption?</span>
                    <input
                    className="post-update-text-box"
                    style={{'border': 'solid 2px white'}}
                    type='text'
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    />
                    
                        <div className="post-update-error-container">
                            {hasSubmitted && validationErrors.caption && (
                                <span className="error">{validationErrors.caption}</span> )}
                        </div>
                </label>


                <label className='post-update-input'>
                    <span className="post-update-span">Add or update an image?</span>
                    <input
                    type="file"
                    accept="image/*"
                    placeholder={image}
                    onChange={(e) => setImage(e.target.files[0])}
                    />
                    {hasSubmitted && validationErrors.image && (
                        <span className="error">{validationErrors.image}</span> )}
                </label>
                {disableButton()}
            </form>
        </div>
    )
}