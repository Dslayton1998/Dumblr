import { useNavigate, useParams } from "react-router-dom";
import { thunkDeletePost } from "../../redux/post";
import { thunkOneBlog } from "../../redux/blog";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";


export default function DeletePostModal( { postId } ) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { blogId } = useParams();
  const { closeModal } = useModal()

  const handleConfirm = async () => {
    await dispatch(thunkDeletePost(postId))
    await dispatch(thunkOneBlog(blogId))
    closeModal()
    navigate(`/blog/${blogId}`)
  }

  const close = () => {
    closeModal()
  }

  return (
    <div className="delete-modal-container">
      <h1 className="delete-modal-header">Are you sure you want to delete this post?</h1>
      <button className="delete-modal-button" onClick={handleConfirm} >Yes</button>
      <button className="delete-modal-button-no" onClick={close} >No</button>
    </div>
  )
}