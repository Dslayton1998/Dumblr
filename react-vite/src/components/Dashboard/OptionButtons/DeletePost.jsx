import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import DeletePostModal from "../DeletePostModal";
import '../PostsCards.css'

export default function DeletePost({ postId }) {
    return (
        <>
        <button className="post-delete-button">
            <OpenModalMenuItem itemText={"Delete"} modalComponent={<DeletePostModal postId={postId} />} className={'fake-button'} />
        </button>
        </>
    )
}