import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import '../BlogPage.css'

export default function UpdateBlog ()  { 
    const navigate = useNavigate()
    const { blogId } = useParams()

    const handleSubmit = () => { 
        navigate(`/blog/${blogId}/update`)
    }
    
  return (
    <>
      <button className="blog-update-button" onClick={handleSubmit} >Update</button>
    </>
  )
}