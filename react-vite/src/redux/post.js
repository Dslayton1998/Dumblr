const GET_POSTS = 'posts/GET_POSTS'
const CREATE_POST = 'posts/CREATE_POST'
const DELETE_POST = 'posts/DELETE_POST'


const getPosts = (posts) => ({
    type: GET_POSTS,
    payload: posts
})

const newPost = (post) => ({
    type: CREATE_POST,
    payload: post
})

const deletePost = (postId) => ({
    type: DELETE_POST,
    payload: postId
})


export const thunkAllPosts = () => async (dispatch) => {
    const res = await fetch("/api/post");
    if(res.ok) {
        const posts = await res.json();
        dispatch(getPosts(posts))
    } else {
        error = await res.json()
        console.log(error)
        return error
    }
}

export const thunkCreatePost = (formData) => async (dispatch) => {
    const res = await fetch("/api/post/new", {
        method: 'POST',
        body: formData
    })
    if (res.ok) {
        const post = await res.json()
        dispatch(newPost(post))
        return post
    } else {
        const error = await res.json()
        console.log(error)
        return error
    }
}

export const thunkDeletePost = (postId) => async (dispatch) => {
    const res = await fetch(`/api/post/${postId}/delete`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(deletePost(postId))
    } else {
        const error = await res.json()
        console.log(error)
        return error
    }
}


function postReducer(state = {}, action) {
    switch (action.type) {
        case GET_POSTS: {
            const newState = {}
            action.payload.forEach(post => {
                newState[post.id] = post
            });
            return newState
        }

        case CREATE_POST: {
            const newState = {...state}
            return {...newState, [action.payload.id]: action.payload}
        }

        case DELETE_POST: {
            const newState = {...state}
            delete newState[action.payload]
            return newState
        }

        default:
            return state
    }
}

export default postReducer