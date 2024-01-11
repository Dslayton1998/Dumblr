import { useEffect } from "react"
import { thunkOneBlog } from "../../redux/blog"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom";
import Posts from "../PostCards/Posts";
import UpdateBlog from "./OptionButtons/UpdateButton";
import DeleteBlog from "./OptionButtons/DeleteButton";
import './BlogPage.css';

export default function BlogPage() {
    const dispatch = useDispatch();
    const { blogId } = useParams();
    const blog = useSelector(state => state.blogs[blogId])
    const currentUser = useSelector(state => state.session.user)

    let posts;
    if(blog) {
        if(blog.posts) {
            posts = blog.posts
        }
    }

    const ownerOptions = () => {
        if (currentUser != null)  {
            if(blog) {
                if(blog.owner_id == currentUser.id) {
                    return <div className="blog-owner-buttons">
                        <UpdateBlog />
                        <DeleteBlog />
                    </div>
                }
            }
        }
    }

    useEffect(() => {
        const oneBlog = async () => {
            await dispatch(thunkOneBlog(blogId))
        }
        oneBlog()
    }, [dispatch])

    return (
        <div className="blog-page-container">
                <div className="blog-images-container" style={{'backgroundImage': `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${blog?.background_image})`, 'backgroundSize': `100% 100%`}}>
                    <img className="profile-picture" src={blog ? blog.profile_picture : null} />
                    <h1 className="blog-title">{blog ? blog.title : null}</h1>
                    <div className="blog-owner-options">{ownerOptions()}</div>
                </div>
            <div>
                {posts ? posts.map(post => (
                    <Posts post={post} key={post.id} />
                )) : null}
            </div>
        </div>  
    )
}