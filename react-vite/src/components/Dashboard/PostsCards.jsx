import { NavLink, useNavigate } from "react-router-dom";
import UpdatePost from "./OptionButtons/UpdatePost";
import DeletePost from "./OptionButtons/DeletePost";
import { FaRegHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import Notes from "../Notes/Notes";
import { useState } from "react";
import './PostsCards.css';
import { thunkCreateLike, thunkDeleteLike } from "../../redux/post";


export default function PostsCards({ post }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [toggleNotes, setToggleNotes] = useState(false);
    const user = useSelector(state => state.session.user);
    const userBlogs = useSelector(state => state.blogs.userBlogs);

    const [liked, setLikedStatus] = useState("");
    let primaryBlog;
    
    for( let blog in userBlogs ) {
        if (userBlogs[blog].primary_blog == true)
        primaryBlog = userBlogs[blog]
    }

//    if(primaryBlog != undefined) {
//        for( let like in likes) {
//             if(likes[like].blog_id == primaryBlog.id) {
//                 currLike = likes[like]
//                 liked = true
//             } else {
//                 liked = false
//             }
//        }
//    }

    const userOptions = () => {
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
        navigate(`/blog/${post.blog.id}`)
    }


    const displayNotes = () => {
        if(toggleNotes == true) {
            return <Notes post={post}/>
        }
    }
//! currently just wants to keep creating likes and never delete might have to check out group project to figure out
    const likeStatus = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("post_id", post.id)
        formData.append("blog_id", primaryBlog.id)
        dispatch(thunkCreateLike(post, formData))

        setLikedStatus(!liked)
    }
    // export default function SongCard({ song, source, playlistId, artistId }) {
    //     const dispatch = useDispatch();
    //     const currentUser = useSelector(state => state.session.user)
    //     const likedSongs = useSelector(state => state.likes)
    //     const [numLikes, setNumLikes] = useState(song.likes)
    //     const [deleted, setDeleted] = useState(false)
    //     const [liked, setLiked] = useState(false)
    //     const { currentSong, setCurrentSong } = useContext(MusicContext)
      
    //     const addLike = async () => {
    //       await dispatch(addLikeThunk(song.id))
    //       setLiked(!liked);
    //       setNumLikes(numLikes + 1);
    //     }
      
    //     const removeLike = async () => {
    //       await dispatch(removeLikeThunk(song.id))
    //       setLiked(!liked)
    //       setNumLikes(numLikes - 1);
    //     }

    const addLike = () => {
        // todo: currently just changing the display, no like is created 
        // adds a like to the post, state variable to toggle like status (like or unlike)
        // like will be created with users primary blog (userBlogs in state can help with this)
        if(user != null) {
            if(liked === true) {
                return (<FaHeart onClick={likeStatus}/>)
            } else {
                return (<FaRegHeart onClick={likeStatus}/>)
            }
        }
    }

// addlikes could just return like component after logic is figured out
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
                    {addLike()}
                </div>
                {displayNotes()}
            </div>

        </div>
    )
}