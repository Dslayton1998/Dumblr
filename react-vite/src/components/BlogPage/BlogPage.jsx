import { useEffect } from "react"
import { thunkOneBlog } from "../../redux/blog"


export default function BlogPage({ blog }) {

    useEffect(() => {
        const oneBlog = async () => {
            await dispatch(thunkOneBlog(blog))
        }
        oneBlog()
    }, [dispatch])
    return (
        <>

        </>
    )
}