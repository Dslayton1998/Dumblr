import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import UpdateCommentModal from "./UpdateCommentModal";

export default function UpdateComment ({ comment, post })  {
  return (
    <>
      <button className="">
        <OpenModalMenuItem itemText={'Update'} modalComponent={<UpdateCommentModal comment={comment} post={post}/>} />
      </button>
    </>
  )
}