const GET_POSTS = 'blog/GET_POSTS'


const getPosts = (posts) => ({
    type: GET_POSTS,
    payload: posts
})


export const thunkAllPosts = () => async (dispatch) => {
    const res = await fetch("/api/post");
    if(res.ok) {
        const posts = await res.json();
        dispatch(getBlog(posts))
    } else {
        error = await res.json()
        console.log(error)
        return error
    }
}


function postReducer(state = {}, action) {
    switch (action.type) {
        case GET_BLOGS: {
            const newState = {}
            action.payload.forEach(blog => {
                newState[blog.id] = blog
            });
            return newState
        }

        default:
            return state
    }
}

export default postReducer