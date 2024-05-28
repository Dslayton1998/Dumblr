import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserBlogs } from "../../redux/blog";
import { thunkAllPosts } from "../../redux/post";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import PostsCards from "./PostsCards";
import './Dashboard.css';
import { thunkGetLikes } from "../../redux/likes";

export default function Dashboard() {
    const backgrounds = ['https://dumblr-bucket.s3.us-east-2.amazonaws.com/testing-LP-background.jpeg',
    'https://dumblr-bucket.s3.us-east-2.amazonaws.com/LP-background.jpeg',
    'https://dumblr-bucket.s3.us-east-2.amazonaws.com/LP-background-2.jpeg',
    'https://dumblr-bucket.s3.us-east-2.amazonaws.com/LP-bakcground-3.jpeg',
    'https://dumblr-bucket.s3.us-east-2.amazonaws.com/LP-background-4.jpeg',
    'https://dumblr-bucket.s3.us-east-2.amazonaws.com/LP-background-5.jpeg' ]
//! Background changes on EVERY rerender, give a select option for users !\\

    const numImages = backgrounds.length
    const randomInt = (max) => {
        return Math.floor(Math.random() * max)
    }
    const selectedBackground = backgrounds[randomInt(numImages)];

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector(state => state.session.user)
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
//* Might not need get currentUserBlogs
        // const getCurrUserBlogs = async () => {
        //     await dispatch(thunkGetUserBlogs(user.id))
        // }

        const getUserLikes = async () => {
            await dispatch(thunkGetLikes(user.primaryBlog.id))
        }
      

        if(user != null) {
            getUserLikes()
        }
        getPosts()
        // getCurrUserBlogs()
    }, [dispatch])


    if(isLoading) {
        return <Loading />
    }
    
    return (
        <>
        <div className="dashboard-container" style={{backgroundImage: `url(${selectedBackground})`}}>
            <h1 className="dashboard-header">Dashboard</h1>
            {posts.map(post => (
                <PostsCards post={post} key={post.id}/>
            ))}
        </div>
        </>
    )
}