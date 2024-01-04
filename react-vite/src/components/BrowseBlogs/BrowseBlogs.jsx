import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkAllBlogs } from "../../redux/blog";

export default function BrowseBlogs() {
    const dispatch = useDispatch();
    const allBlogs = useSelector(state => Object.values(state.blogs))

    useEffect(() => {
        const getBlogs = async () => {
            await dispatch(thunkAllBlogs())
        }
        getBlogs()
    }, [dispatch])

// todo: sort by date created (or most popular when followers are implemented)
    return (
        <>
        <h1>Browse through blogs!</h1>
        <div>
            {allBlogs.map(blog => {

            })}
        </div>
        </>
    )
}