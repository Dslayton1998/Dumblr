import { useNavigate } from 'react-router-dom';
import './MyBlogs.css';

export default function BlogCard({ blog }) {
    const navigate = useNavigate();
    const onClick = () => {
        navigate(`/blog/${blog.id}`)
    }

    return (
        <div className="blog-card" onClick={onClick} style={{'backgroundImage': `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${blog.background_image})`, 'backgroundSize': `100% 100%`}}>
           <img className='blog-card-profile-picture' src={blog.profile_picture} />
           <p className="blog-card-title">{blog.blog_name}</p>
        </div>
    )
}