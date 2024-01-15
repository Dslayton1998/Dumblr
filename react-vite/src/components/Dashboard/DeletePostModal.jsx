import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkAllPosts, thunkDeletePost } from "../../redux/post";


export default function DeletePostModal( { postId } ) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { closeModal } = useModal()

  const handleConfirm = async () => {
    await dispatch(thunkDeletePost(postId))
    await dispatch(thunkAllPosts());
    closeModal()
    navigate(`/dashboard`)
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