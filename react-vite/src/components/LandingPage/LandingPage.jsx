import { NavLink, useNavigate } from "react-router-dom"
import './LandingPage.css'

export default function LandingPage() {
const navigate = useNavigate();
const backgrounds = ['https://dumblr-bucket.s3.us-east-2.amazonaws.com/testing-LP-background.jpeg', 'https://dumblr-bucket.s3.us-east-2.amazonaws.com/LP-background.jpeg', 'https://dumblr-bucket.s3.us-east-2.amazonaws.com/LP-background-2.jpeg', 'https://dumblr-bucket.s3.us-east-2.amazonaws.com/LP-bakcground-3.jpeg', 'https://dumblr-bucket.s3.us-east-2.amazonaws.com/LP-background-4.jpeg', 'https://dumblr-bucket.s3.us-east-2.amazonaws.com/LP-background-5.jpeg']
const numImages = backgrounds.length
const randomInt = (max) => {
    return Math.floor(Math.random() * max)
}
const selectedBackground = backgrounds[randomInt(numImages)]



    const onClickDashboard = () => {
        navigate(`/dashboard`)
    }

    return (
        <div className="landing-container">
            <img className="landing-background" src={selectedBackground}/>
            <div className="landing-options-container">
                <div className="landing-options">

                    <div className="landing-sign-up">
                        <h3>Sign-up!</h3>
                        <p>Don't have an account?</p>
                        <NavLink className="landing-link" to='/signup'>Sign up</NavLink>
                    </div>

                    <div className="landing-log-in">
                        <h3>Log-in!</h3>
                        <p>Already a member?</p>
                        <NavLink className="landing-link" to='/login'>Log in</NavLink>
                    </div>

                </div>
                <div className="landing-dashboard-button-container">
                    <button className="landing-dashboard-button" onClick={onClickDashboard}>Dashboard</button>
                </div>
            </div>
        </div>
    )
}