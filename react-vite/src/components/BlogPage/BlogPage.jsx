import { useDispatch, useSelector } from "react-redux";
import UpdateBlog from "./OptionButtons/UpdateButton";
import DeleteBlog from "./OptionButtons/DeleteButton";
import { thunkGetUserBlogs } from "../../redux/blog";
import { thunkAllPosts } from "../../redux/post";
import { thunkOneBlog } from "../../redux/blog";
import { useParams } from "react-router-dom";
import Posts from "../PostCards/Posts";
import { useEffect } from "react";
import './BlogPage.css';

export default function BlogPage() {
    const dispatch = useDispatch();
    const { blogId } = useParams();
    const blog = useSelector(state => state.blogs[blogId])
    // const user = useSelector(state => state.session.user)
    const currentUser = useSelector(state => state.session.user)

    let posts;
    if(blog) {
        if(blog.posts) {
            const postsArr = blog.posts
            const jObj = Object.values(postsArr)
        // * Using Object.values to parse into javascript object so reverse will work
            const reverseArr = jObj.reverse()
            posts = reverseArr
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

        const getPosts = async () => {
            await dispatch(thunkAllPosts())
        }

        const getCurrUserBlogs = async () => {
            await dispatch(thunkGetUserBlogs(currentUser.id))
        }

        oneBlog()
        getPosts()
        getCurrUserBlogs()
    }, [dispatch])

    return (
        <div className="blog-page-container">
                <div className="blog-images-container" style={{'backgroundImage': `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${blog?.background_image})`, 'backgroundSize': `100% 100%`}}/>

                <img className="profile-picture" src={blog ? blog.profile_picture : null} />

                <div className="blog-details">
                    <div className="blog-owner-options">{ownerOptions()}</div>
                    <h1 className="blog-title">{blog ? blog.title : null}</h1>
                </div>

            <div>
                {posts ? posts.map(post => (
                    <Posts post={post} key={post.id} />
                )) : null}
            </div>
        </div>  
    )
}