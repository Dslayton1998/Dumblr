const GET_POSTS = 'posts/GET_POSTS'
const GET_ONE_POST = 'post/GET_ONE_POST'
const CREATE_POST = 'posts/CREATE_POST'
const DELETE_POST = 'posts/DELETE_POST'
const UPDATE_POST = 'posts/UPDATE_POST'


const CREATE_COMMENT = 'comment/CREATE_COMMENT'
const DELETE_COMMENT = 'comment/DELETE_COMMENT'
const UPDATE_COMMENT = 'comment/UPDATE_COMMENT'


const getPosts = (posts) => ({
    type: GET_POSTS,
    payload: posts
})

const getOnePost = (post) => ({
    type: GET_ONE_POST,
    payload: post
})

const newPost = (post) => ({
    type: CREATE_POST,
    payload: post
})

const deletePost = (postId) => ({
    type: DELETE_POST,
    payload: postId
})

const updatePost = (postId) => ({
    type: UPDATE_POST,
    payload: postId
})




const newComment = (post, comment) => ({
    type: CREATE_COMMENT,
    payload: {post, comment}
})

const deleteComment = (post, commentId) => ({
    type: DELETE_COMMENT,
    payload: {post, commentId}
})

const updateComment = (post, comment) => ({
    type: UPDATE_COMMENT,
    payload: {post, comment}
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

export const thunkOnePost = (postId) => async (dispatch) => {
    const res = await fetch(`/api/post/${postId}`);
    if(res.ok) {
        const post = await res.json();
        dispatch(getOnePost(post))
        return post
    } else {
        const error = await res.json()
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

export const thunkUpdatePost = (postId, formData) => async (dispatch) => {
    const res = await fetch(`/api/post/${postId}/update`, {
        method: 'PUT',
        body: formData
    })

    if(res.ok) {
        const post = await res.json()
        dispatch(updatePost(postId))
    } else {
        const error = await res.json()
        console.log(error)
        return error
    }
}




export const thunkCreateComment = (post, formData) => async (dispatch) => {
    const res = await fetch("/api/post/new/comment", {
        method: 'POST',
        body: formData
    })

    if(res.ok) {
        const comment = await res.json()
        dispatch(newComment(post, comment))
        return comment
    } else {
        const error = await res.json()
        console.log(error)
        return error
    }
}

export const thunkDeleteComment = (post, commentId) => async (dispatch) => {
    const res = await fetch(`/api/post/${commentId}/delete/comment`, {
        method: 'DELETE'
    })

    if(res.ok) {
        dispatch(deleteComment(post, commentId))
    } else {
        const error = await res.json()
        console.log(error)
        return error
    }
}

export const thunkUpdateComment = (post, comment, formData) => async (dispatch) => {
    const res = await fetch(`/api/post/${comment.id}/update/comment`, {
        method: 'PUT',
        body: formData
    })

    if(res.ok) {
        const newComment = await res.json()
        dispatch(updateComment(post, newComment))
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

        case GET_ONE_POST: {
            return {...state, [action.payload.id]: action.payload}
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

        case CREATE_COMMENT: {
            const post = action.payload.post
            const comment = action.payload.comment
            const statePost = state[post.id].comments
            statePost[comment.id] = comment
            return {...state}
        }

        case DELETE_COMMENT: {
            const post = action.payload.post
            const commentId = action.payload.commentId
            const newState ={...state}
            delete newState[post.id].comments[commentId]
            return newState
        }

        case UPDATE_COMMENT: {
            const post = action.payload.post
            const comment = action.payload.comment
            const newState = {...state}
            newState[post.id].comments[comment.id].comment = comment.comment
            return newState
        }

        default:
            return state
    }
}

export default postReducer