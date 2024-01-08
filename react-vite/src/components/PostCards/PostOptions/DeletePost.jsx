import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import DeletePostModal from "../DeletePostModal";

export default function DeletePost({ postId }) {
    return (
        <>
        <OpenModalMenuItem itemText={"Delete"} modalComponent={<DeletePostModal postId={postId} />} className={'fake-button'} />
        </>
    )
}