import { useModal } from "../../context/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkAllPosts, thunkDeletePost } from "../../redux/post";


export default function DeletePostModal( { postId } ) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { blogId } = useParams();
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
    <div>
      <h1>Are you sure you want to delete this post?</h1>
      <button onClick={handleConfirm} >Yes</button>
      <button onClick={close} >No</button>
    </div>
  )
}