import { useNavigate } from "react-router-dom";

export default function UpdatePost ({ postId })  { 
    const navigate = useNavigate()
    const handleSubmit = () => { 
        navigate(`/post/${postId}/update`)
    }
    
  return (
    <>
      <button onClick={handleSubmit} >Update</button>
    </>
  )
}