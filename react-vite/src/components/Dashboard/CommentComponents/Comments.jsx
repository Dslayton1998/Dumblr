//todo: Need blog information to give an option to comment under x blog name
//! DATABASE: models need refactor so comments tracks blog.id
import { thunkDeleteComment } from "../../../redux/post";
import { useDispatch, useSelector } from "react-redux";
import UpdateComment from "./UpdateComment";
import { useEffect } from "react";
import { thunkAllUserBlogs } from "../../../redux/blog";

export default function Comments({ comment, post }) {
    const dispatch = useDispatch();
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

    const onClick = () => {
        dispatch(thunkDeleteComment(post, comment.id))
    } 
    
    useEffect(() => {
        const getBlogs = async () => {
            await dispatch(thunkAllUserBlogs())
        }
        getBlogs()
    }, [dispatch]) 

    return (
        <div className="comment">
            {comment.comment}
            <button onClick={onClick}>Delete</button>
            <UpdateComment comment={comment} post={post}>Update</UpdateComment>
        </div>
    )
}