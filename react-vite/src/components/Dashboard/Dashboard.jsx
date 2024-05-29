import { useDispatch, useSelector } from "react-redux";
import { thunkGetLikes } from "../../redux/likes";
import { thunkAllPosts } from "../../redux/post";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import PostsCards from "./PostsCards";
import './Dashboard.css';

export default function Dashboard() {
//! Background changes on EVERY rerender, give a select option for users !\\
    const backgrounds = [
    // 'https://dumblr-bucket.s3.us-east-2.amazonaws.com/testing-LP-background.jpeg', // CoCo
    // 'https://dumblr-bucket.s3.us-east-2.amazonaws.com/LP-background.jpeg', // Beach
    // 'https://dumblr-bucket.s3.us-east-2.amazonaws.com/LP-background-2.jpeg', //PurpleMountain
    // 'https://dumblr-bucket.s3.us-east-2.amazonaws.com/LP-bakcground-3.jpeg', //NightSkyForest
    'https://dumblr-bucket.s3.us-east-2.amazonaws.com/LP-background-4.jpeg', // SpookySwamp
    // 'https://dumblr-bucket.s3.us-east-2.amazonaws.com/LP-background-5.jpeg' // City 
    ]
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

        const getUserLikes = async () => {
            await dispatch(thunkGetLikes(user.primaryBlog.id))
        }

        if(user != null) {
            getUserLikes()
        }
        getPosts()
    }, [dispatch, user])


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