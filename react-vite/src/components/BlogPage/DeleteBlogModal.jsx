import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkAllPosts } from "../../redux/post";


export default function DeleteBlogModal( {blogId} ) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { closeModal } = useModal()

  const handleConfirm = async () => {
    await dispatch((blogId))
    await dispatch(thunkAllPosts());
    closeModal()
    navigate('/dashboard')
  }

  const close = () => {
    closeModal()
  }

  return (
    <div>
      <h1>Are you sure you want to delete this Blog?</h1>
      <button onClick={handleConfirm} >Yes</button>
      <button onClick={close} >No</button>
    </div>
  )
}