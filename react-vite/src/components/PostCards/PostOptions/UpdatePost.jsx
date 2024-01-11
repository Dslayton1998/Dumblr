import { useNavigate } from "react-router-dom";
import '../../Dashboard/PostsCards.css'

export default function UpdatePost ({ postId })  { 
    const navigate = useNavigate()
    const handleSubmit = () => { 
        navigate(`/post/${postId}/update`)
    }
    
  return (
    <>
      <button className="post-update-button" onClick={handleSubmit} >Update</button>
    </>
  )
}