import { useState } from "react"

// todo: finish up here!

export default function CreateBlogForm() {
    const [title, setTitle] = useState("")
    const [blogName, setBlogName] = useState("")
    const [profilePicture, setProfilePicture] = useState("")
    const [backgroundImage, setBackgroundImage] = useState("")
    const [publicStatus, setPublicStatus] = useState(true)

    return (
        <>This will be a form</>
    )
}