import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"

export default function UpdateCommentModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleConfirm = async () => {
        //todo: dispatch for update thunk
        closeModal()
    }

    const close = () => {
        closeModal()
    }

    return (
        <div>
            hello!
        </div>
    )
}