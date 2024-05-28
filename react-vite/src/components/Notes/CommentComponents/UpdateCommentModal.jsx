import { thunkUpdateComment } from "../../../redux/post";
import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { useState } from "react";
import "./UpdateComment.css";

export default function UpdateCommentModal({ comment, post }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [newComment, setNewComment] = useState(comment.comment);
    const [validationErrors, setValidationsErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
// todo: error handling for updating comments 
        if (Object.values(validationErrors).length) {
            return;
        }

        const formData = new FormData();
        formData.append("comment", newComment)
        await dispatch(thunkUpdateComment(post, comment, formData))

        closeModal()
    };


    const close = () => {
        closeModal()
    }

    return (
        <div className="update-comment-modal">
            <h1 style={{fontSize: 24}}>Update your comment</h1>
            <form className="update-comment-form" onSubmit={handleSubmit} encType="multipart/form-data">
                <span>Provide a new comment.</span>
                <label>
                    <textarea 
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    style={{width: 500, resize: "none", marginTop: 5, borderRadius: 5, padding: 5}}
                    maxLength={500}
                    />
                </label>

                <div className="update-comment-buttons">
                    <button type="submit">Confirm</button>
                    <button onClick={close}>Cancel</button>
                </div>
            </form>
        </div>
    )
}