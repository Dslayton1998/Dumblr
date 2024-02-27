
import UpdateCommentModal from "./UpdateCommentModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";


export default function UpdateComment ({ comment, post })  {
    // console.log(comment)
  return (
    <>
    <button className="">
      <OpenModalMenuItem itemText={'Update'} modalComponent={<UpdateCommentModal comment={comment} post={post}/>} />
    </button>
    </>
  )
}