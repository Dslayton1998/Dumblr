//todo: could use getLikes to help with delete
const GET_LIKES = 'likes/GET_LIKES'
const DELETE_LIKE = 'likes/DELETE_LIKE'

const getLikes = (likes) => ({
  type: GET_LIKES,
  payload: likes
})

const deleteLike = (likeId) => ({
  type: DELETE_LIKE,
  payload: likeId
})

export const getLikesThunk = () => async (dispatch) => {
    // const res = await fetch('/api/users/likes')
    if (res.ok) {
      const likes = await res.json()
      dispatch(getLikes(likes))
    } else {
      const error = await res.json();
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
        dispatch(getLikes({post, like}))
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
      case GET_LIKES: {
        return action.payload
      }
      default:
        return state
    }
  }
  
  export default likesReducer