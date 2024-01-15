import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkAllPosts } from "../../redux/post";
import { thunkDeleteBlog } from "../../redux/blog";


export default function DeleteBlogModal( {blogId} ) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { closeModal } = useModal()

  const handleConfirm = async () => {
    await dispatch(thunkDeleteBlog(blogId))
    await dispatch(thunkAllPosts());
    closeModal()
    navigate('/dashboard')
  }

  const close = () => {
    closeModal()
  }

  return (
    <div className="delete-modal-container">
      <h1 className="delete-modal-header">Are you sure you want to delete this Blog?</h1>
          <button className="delete-modal-button" onClick={handleConfirm} >Yes</button>
          <button className="delete-modal-button-no" onClick={close} >No</button>
    </div>
  )
}