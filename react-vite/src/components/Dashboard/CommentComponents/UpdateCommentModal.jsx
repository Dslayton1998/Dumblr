import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useState } from "react";
import { thunkUpdateComment } from "../../../redux/post";

export default function UpdateCommentModal({ comment, post }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [newComment, setNewComment] = useState(comment.comment);
    const [validationErrors, setValidationsErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

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
        <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <span>Provide a new comment...</span>
                <label>
                    <input 
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    />
                </label>
                <button type="submit">Confirm</button>
            </form>
            <button onClick={close}>Cancel</button>
            <span>...Or cancel</span>
        </div>
    )
}