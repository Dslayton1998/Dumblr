import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { thunkAllPosts } from "../../redux/post";
import PostsCards from "./PostsCards";
import { thunkAllBlogs } from "../../redux/blog";

export default function Dashboard() {
    //todo: render posts as cards, rest of the dashboard comes later
    const dispatch = useDispatch();
    const allPosts = useSelector(state => Object.values(state.posts))

    useEffect(() => {
        const getPosts = async () => {
            await dispatch(thunkAllPosts())
        }

        const getBlogs = async () => {
            await dispatch(thunkAllBlogs())
        }

        getPosts()
        getBlogs()
    }, [dispatch])

    return (
        <>
        <div>
            {allPosts.map(post => (
                <PostsCards post={post} key={post.id}/>
            ))}
        </div>
        </>
    )
}