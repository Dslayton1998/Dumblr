import { useDispatch, useSelector } from "react-redux";
import { thunkAllUserBlogs } from "../../redux/blog";
import { useEffect } from "react";
import BlogCard from "./BlogCard";
import './MyBlogs.css';

export default function MyBlogs() {
    const dispatch = useDispatch()
    const blogs = useSelector(state => Object.values(state.blogs))
    const currentUser = useSelector(state => state.session.user)

    let userBlogs = [];
    blogs.map(blog => {
        if(currentUser != undefined) {
            if(blog.owner_id == currentUser.id) {
                userBlogs.push(blog)
            }
        }
    })

    useEffect(() => {
        const getUserBlogs = async () => {
            await dispatch(thunkAllUserBlogs())
        }
        getUserBlogs()
    }, [dispatch])

    return (
        <div className="my-blogs">
            <div className="blog-card-container">
            {userBlogs.map(blog => (
                <BlogCard blog={blog} key={blog.id} />
            ))}
            </div>
        </div>
    )
}