import { useModal } from "../../context/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkDeletePost } from "../../redux/post";
import { thunkOneBlog } from "../../redux/blog";


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
    <div>
      <h1>Are you sure you want to delete this post?</h1>
      <button onClick={handleConfirm} >Yes</button>
      <button onClick={close} >No</button>
    </div>
  )
}