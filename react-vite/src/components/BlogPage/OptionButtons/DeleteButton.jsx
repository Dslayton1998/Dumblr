import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import DeleteBlogModal from "../DeleteBlogModal";
import { useParams } from "react-router-dom";


export default function DeleteBlog ()  {
    const { blogId } = useParams();

  return (
    <>
      <OpenModalMenuItem itemText={'Delete'} modalComponent={<DeleteBlogModal blogId={blogId} />} />
    </>
  )
}