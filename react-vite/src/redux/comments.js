//! The way the redux store is currently set comments are on posts, Might have to rethink
//* possible don't need a reducer but could make things clunky (would have to refresh to see created comment)


const CREATE_COMMENT = 'comment/CREATE_COMMENT'

const newComment = (comment) => ({
    type: CREATE_COMMENT,
    payload: comment
})

export const thunkCreateComment = (formData) => async (dispatch) => {
    const res = await fetch("api/post/new/comment", {
        method: 'POST',
        body: formData
    })
    if(res.ok) {
        const comment = await res.json()
        dispatch(newComment(comment))
        return comment
    } else {
        const error = await res.json()
        console.log(error)
        return error
    }
}


function commentReducer(state = {}, action) {
    switch(action.type) {
        case CREATE_COMMENT: {

        }
        
        default:
            return state
    }
}