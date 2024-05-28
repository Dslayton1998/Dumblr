//todo: could use getLikes to help with delete
const GET_LIKES = '/likes/GET_LIKES'
const CREATE_LIKES = 'likes/GET_LIKES'
const DELETE_LIKE = 'likes/DELETE_LIKE'

const getLikes = (likes) => ({
  type: GET_LIKES,
  payload: likes
})

const createLikes = (likes) => ({
  type: CREATE_LIKES,
  payload: likes
})

const deleteLike = (likeId) => ({
  type: DELETE_LIKE,
  payload: likeId
})

export const thunkGetLikes = (blogId) => async (dispatch) => {
  const res = await fetch(`/api/post/${blogId}/likes`)
}


export const thunkCreateLike = (post, formData) => async (dispatch) => {
    const res = await fetch('/api/post/like', {
        method: 'POST',
        body: formData
    })

    if(res.ok) {
        const like = await res.json()
        dispatch(createLikes({post, like}))
        return like
    } else {
        const error = await res.json()
        console.log(error)
        return error
    }
}


export const thunkDeleteLike = (likeId) => async (dispatch) => {
    const res = await fetch(`/api/post/${likeId}/unlike`, {
        method: 'DELETE'
    })

    if(res.ok) {
        dispatch(deleteLike(likeId))
    } else {
        const error = await res.json()
        console.log(error)
        return error
    }
}


function likesReducer(state = {}, action) {
    switch (action.type) {
      case CREATE_LIKES: {
        const newState = {...state}
        return {...newState, [action.payload.like.id]: action.payload}
      }

      case DELETE_LIKE: {
        const newState = {...state}
        delete newState[action.payload]
        return newState
      }

      default:
        return state
    }
  }
  
  export default likesReducer