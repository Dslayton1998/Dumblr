import { useNavigate } from "react-router-dom"

export default function LandingPage() {
const navigate = useNavigate();

    const onClickCreate = () => {
        navigate(`/blog/new`)
    }

    const onClickDashboard = () => {
        navigate(`/dashboard`)
    }

    return (
        <>
        <button onClick={onClickCreate}>Create a new blog</button>
        <button onClick={onClickDashboard}>Dashboard</button>
        </>
    )
}