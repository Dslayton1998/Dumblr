const GET_BLOGS = 'blog/GET_BLOGS'
const GET_A_BLOG = 'blog/GET_A_BLOG'
const USER_BLOGS = 'blog/USER_BLOGS'
const CREATE_BLOG = 'blog/CREATE_BLOG'
const DELETE_BLOG = 'blog/DELETE_BLOG'
const UPDATE_BLOG = 'blog/UPDATE_BLOG'


const usersBlogs = (blogs) => ({
    type: GET_BLOGS,
    payload: blogs
})

const oneBlog = (blog) => ({
    type: GET_A_BLOG,
    payload: blog
})

const newBlog = (blog) => ({
    type: CREATE_BLOG,
    payload: blog
})

const deleteBlog = (blogId) => ({
    type: DELETE_BLOG,
    payload: blogId
})

const updateBlog = (blogId) => ({
    type: UPDATE_BLOG,
    payload: blogId
})

const userBlogs = (blogs) => ({
    type: USER_BLOGS,
    payload: blogs
})

export const thunkAllUserBlogs = () => async (dispatch) => {
    const res = await fetch("/api/blog");
    if(res.ok) {
        const blogs = await res.json();
        dispatch(usersBlogs(blogs))
    } else {
        const error = await res.json()
        console.log(error)
        return error
    }
}

export const thunkOneBlog = (blogId) => async (dispatch) => {
    const res = await fetch(`/api/blog/${blogId}`);
    if(res.ok) {
        const blog = await res.json();
        dispatch(oneBlog(blog))
        return blog
    } else {
        const error = await res.json();
        console.log(error)
        return error
    }
}


export const thunkCreateBlog = (formData) => async (dispatch) => {
    const res = await fetch('/api/blog/new', {
        method: 'POST',
        body: formData
    });

    if(res.ok) {
        const blog = await res.json()
        dispatch(newBlog(blog))
        return blog
    } else {
        const error = await res.json()
        console.log(error)
        return error
    }
}

export const thunkDeleteBlog = (blogId) => async (dispatch) => {
    const res = await fetch(`/api/blog/${blogId}/delete`, {
        method: 'DELETE'
    })

    if(res.ok) {
        dispatch(deleteBlog(blogId))
    } else {
        const error = res.json()
        console.log(error)
        return error
    }
}


export const thunkUpdateBlog = (blogId, formData) => async (dispatch) => {
    const res = await fetch(`/api/blog/${blogId}/update`, {
        method: 'PUT',
        body: formData
    })

    if(res.ok) {
        dispatch(updateBlog(blogId))
    } else {
        const error = await res.json()
        console.log(error)
        return error
    }
}

export const thunkGetUserBlogs = (userId) => async (dispatch) => {
    const res = await fetch(`api/blog/user/${userId}`)

    if (res.ok) {
        const blogs = await res.json()
        dispatch(userBlogs(blogs))
    } else {
        const error = await res.json()
        console.log(error)
        return error
    }
}


function blogReducer(state = {}, action) {
    switch (action.type) {
        case GET_BLOGS: {
            const newState = {}
            action.payload.forEach(blog => {
                newState[blog.id] = blog
            });
            return newState
        }

        case GET_A_BLOG: {
            return {...state, [action.payload.id]: action.payload}
        }

        case CREATE_BLOG: {
            const newState = {...state}
            return {...newState, [action.payload.id]: action.payload}
        }

        case DELETE_BLOG: {
            const newState = {...state}
            delete newState[action.payload]
            return newState
        }

        case UPDATE_BLOG: {
            return {...state, [action.payload]:{...state[action.payload]}}
        }

        case USER_BLOGS: {
            const newState = {userBlogs:{}}
            action.payload.forEach(blog => {
                newState.userBlogs[blog.id] = blog
            });
            return newState
        }

        default:
            return state
    }
}

export default blogReducer