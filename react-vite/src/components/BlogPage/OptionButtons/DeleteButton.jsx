import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import DeleteBlogModal from "../DeleteBlogModal";
import { useParams } from "react-router-dom";
import '../BlogPage.css';


export default function DeleteBlog ()  {
    const { blogId } = useParams();

  return (
    <>
    <button className="blog-delete-button">
      <OpenModalMenuItem itemText={'Delete'} modalComponent={<DeleteBlogModal blogId={blogId} />} />
    </button>
    </>
  )
}