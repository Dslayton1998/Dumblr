import { thunkCreateLike, thunkDeleteLike } from "../../redux/likes";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UpdatePost from "./OptionButtons/UpdatePost";
import DeletePost from "./OptionButtons/DeletePost";
// import { FaRegComment } from "react-icons/fa";
// *^ Comment icon inverse, for styles
import { FaRegHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Notes from "../Notes/Notes";
import { useState } from "react";
import './PostsCards.css';

// todo: refactor (likes functionality needs it's own component)
export default function PostsCards({ post }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [toggleNotes, setToggleNotes] = useState(false);
    // const user = useSelector(state => state.session.user);

//* Likes \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    const [numLikes, setNumLikes] = useState(Object.values(post.likes).length);
    const user = useSelector(state => state.session.user);
    const likes = useSelector(state => state.likes)

    let currLike;
    // ^ For removeLike, selects the like from the current user, on the current post
    if(user != null) {
        for(const like in likes) {
            if(likes[like].post_id == post.id) {
                currLike = likes[like]
            }
        }
    }

    const addLike = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("post_id", post.id)
        formData.append("blog_id", user.primaryBlog.id)
        await dispatch(thunkCreateLike(post, formData))
    
        setNumLikes(numLikes + 1);
    }

    const removeLike = async (e) => {
        e.preventDefault();
        await dispatch(thunkDeleteLike(post.id, currLike.id))

        setNumLikes(numLikes - 1);
    }

    const toggleLike = () => {
    // If there is a user signed in...
        if(user != null) {
        // And if the likes redux store for the current post is not empty(undefined)
            if(likes[post.id] != undefined) {
                // console.log('IT HAS VALUE, so it's been liked')
                return <><FaHeart onClick={removeLike}/> {numLikes} </>
            } else {
                // console.log('IT HAS NO VALUE, so the user did not like it')
                return <><FaRegHeart onClick={addLike}/> {numLikes} </>
            }
        }
    }
//* Likes \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    const userOptions = () => {
    // If the current user is the creator of the current post, give them user-options
        if(user != null) {
            if(post.user_id == user.id) {
                return  <div className="dashboard-user-options">
                    <UpdatePost postId={post.id}/>
                    <DeletePost postId={post.id} />
                </div>
            }
        }
    }

    const onClick = () => {
    // Each post has a link to visit the blog that created it.
        navigate(`/blog/${post.blog.id}`)
    }


    const displayNotes = () => {
    // Switch, to bring up notes(comments, likes, ...reblogs)
        if(toggleNotes == true) {
            return <Notes post={post}/>
        }
    }

    return (
        <div className="post-container">
            <div className="dashboard-blog" onClick={onClick}>
                <div className="dashboard-blog-info">
                    <img className="dashboard-blog-image" src={post.blog.profile_picture} />
                    <NavLink className='dashboard-blog-link' to={`/blog/${post.blog.id}`}>{post.blog.blog_name}</NavLink>
                </div>
                {userOptions()}
            </div>

            {post.image ? <img className="post-image" src={post.image}/> : null}
            <div className="post-caption">{post.caption}</div>


            <div className="notes-container">
                <div className="note-options">
                    <div className="notes-button" onClick={() => setToggleNotes(!toggleNotes)}>Notes</div>
                    <FaComment className="comment-icon" onClick={() => setToggleNotes(!toggleNotes)}/>
                    {toggleLike()}
                </div>
                {displayNotes()}
            </div>

        </div>
    )
}