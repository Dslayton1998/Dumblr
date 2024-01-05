import { useEffect } from "react"
import { thunkOneBlog } from "../../redux/blog"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import Posts from "./Posts";

//todo: styles!

export default function BlogPage() {
    const dispatch = useDispatch();
    const { blogId } = useParams();
    const blog = useSelector(state => state.blogs[blogId])
    let posts;
    if(blog) {
        if(blog.posts) {
            posts = blog.posts
            console.log(posts)
        }
    }

    useEffect(() => {
        const oneBlog = async () => {
            await dispatch(thunkOneBlog(blogId))
        }
        oneBlog()
    }, [dispatch])

    return (
        <>
        <img src={blog ? blog.background_image : null} />
            <div>
                <img src={blog ? blog.profile_picture : null} />
                <h2>{blog ? blog.title : null}</h2>
            </div>
            <div>
                {posts ? posts.map(post => (
                    <Posts post={post} />
                )) : null}
            </div>
        </>
    )
}