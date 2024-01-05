const GET_A_BLOG = 'blog/GET_A_BLOG'


const oneBlog = (blog) => ({
    type: GET_A_BLOG,
    payload: blog
})


// export const thunkAllBlogs = () => async (dispatch) => {
//     const res = await fetch("/api/blog");
//     if(res.ok) {
//         const blogs = await res.json();
//         dispatch(getBlog(blogs))
//     } else {
//         error = await res.json()
//         console.log(error)
//         return error
//     }
// }

export const thunkOneBlog = (blogId) => async (dispatch) => {
    const res = await fetch(`/api/blog/${blogId}`);
    if(res.ok) {
        const blog = await res.json();
        dispatch(oneBlog(blog))
    } else {
        error = await res.json();
        console.log(error)
        return error
    }
}


function blogReducer(state = {}, action) {
    switch (action.type) {
        // case GET_BLOGS: {
        //     const newState = {}
        //     action.payload.forEach(blog => {
        //         newState[blog.id] = blog
        //     });
        //     return newState
        // }

        case GET_A_BLOG: {
            return {...state, [action.payload.id]: action.payload}
        }

        default:
            return state
    }
}

export default blogReducer