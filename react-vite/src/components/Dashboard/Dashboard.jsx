import { useDispatch, useSelector } from "react-redux";
import { thunkAllPosts } from "../../redux/post";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import PostsCards from "./PostsCards";
import './Dashboard.css';

export default function Dashboard() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const allPosts = useSelector(state => state.posts ? Object.values(state.posts): null)
    const reversePosts = allPosts.reverse()
    const posts = [];
    reversePosts.forEach(post => {
        if(post.blog.public != false) {
            posts.push(post)
        }
    })

    useEffect(() => {
        const getPosts = async () => {
            await dispatch(thunkAllPosts())
            setIsLoading(false)
        }

        getPosts()
    }, [dispatch])


    if(isLoading) {
        return <Loading />
    }
    
    return (
        <>
        <div className="dashboard-container">
            <h1 className="dashboard-header">Dashboard</h1>
            {posts.map(post => (
                <PostsCards post={post} key={post.id}/>
            ))}
        </div>
        </>
    )
}