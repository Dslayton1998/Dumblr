import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";

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

        if(!publicStatus) {
            errors.publicStatus = "Please select a privacy preference for this blog."
        }

        setValidationsErrors(errors)
    }, [title, blogName, profilePicture, publicStatus])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)

        if (Object.values(validationErrors).length) {
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("blog_name", blogName)
        formData.append("profile_picture", profilePicture)
        formData.append("public", publicStatus)
        let blog = await dispatch(thunk)
        navigate(`/blog/${blog.id}`)
    }

    return (
        <>This will be a form</>
    )
}