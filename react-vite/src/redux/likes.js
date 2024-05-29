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

const deleteLike = (postId, likeId) => ({
  type: DELETE_LIKE,
  payload: {postId, likeId}
})

export const thunkGetLikes = (blogId) => async (dispatch) => {
  const res = await fetch(`/api/post/${blogId}/likes`)

  if(res.ok) {
    const likes = await res.json()
    dispatch(getLikes(likes))
    return likes
  } else {
    const error = await res.json()
    console.log(error)
    return error
  }
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


export const thunkDeleteLike = (postId, likeId) => async (dispatch) => {
    const res = await fetch(`/api/post/${likeId}/unlike`, {
        method: 'DELETE'
    })

    if(res.ok) {
        dispatch(deleteLike(postId, likeId))
    } else {
        const error = await res.json()
        console.log(error)
        return error
    }
}


function likesReducer(state = {}, action) {
    switch (action.type) {
      case GET_LIKES: {
        const likesArr = action.payload
        const newSet = {}
        likesArr.forEach(like => {
          newSet[like.post_id] = like
        });
        return newSet
      }

      case CREATE_LIKES: {
        const newState = {...state}
        return {...newState, [action.payload.like.post_id]: action.payload.like}
      }

      case DELETE_LIKE: {
        const newState = {...state}
        delete newState[action.payload.postId]
        return newState
      }

      default:
        return state
    }
  }
  
  export default likesReducer