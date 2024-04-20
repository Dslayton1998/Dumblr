import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import { useEffect, useState } from "react";
import './LandingPage.css';

export default function LandingPage() {
    const backgrounds = ['https://dumblr-bucket.s3.us-east-2.amazonaws.com/testing-LP-background.jpeg',
        'https://dumblr-bucket.s3.us-east-2.amazonaws.com/LP-background.jpeg',
        'https://dumblr-bucket.s3.us-east-2.amazonaws.com/LP-background-2.jpeg',
        'https://dumblr-bucket.s3.us-east-2.amazonaws.com/LP-bakcground-3.jpeg',
        'https://dumblr-bucket.s3.us-east-2.amazonaws.com/LP-background-4.jpeg',
        'https://dumblr-bucket.s3.us-east-2.amazonaws.com/LP-background-5.jpeg' ]

    const numImages = backgrounds.length
    const randomInt = (max) => {
            return Math.floor(Math.random() * max)
        }
    const selectedBackground = backgrounds[randomInt(numImages)]
    const [showMenu, setShowMenu] = useState(false);


    useEffect(() => {
        if (!showMenu) return;
    
        const closeMenu = (e) => {
          if (ulRef.current && !ulRef.current.contains(e.target)) {
            setShowMenu(false);
          }
        };
    
        document.addEventListener("click", closeMenu);
    
        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);
    
      const closeMenu = () => setShowMenu(false);

    return (
        <div className="landing-container">
            <img className="landing-background" src={selectedBackground}/>
            <div className="landing-options-container">
                <div className="landing-options">

                    <div className="landing-sign-up">
                        <p style={{"fontWeight": "bold", "fontSize": "16px"}} >Sign-up!</p>
                        <p>Don't have an account?</p>
                        <OpenModalMenuItem
                            itemText="Sign Up"
                            className={"landing-link"}
                            onItemClick={closeMenu}
                            modalComponent={<SignupFormModal />}
                        />
                    </div>

                    <div className="landing-log-in">
                        <p style={{"fontWeight": "bold", "fontSize": "16px"}} >Log-in!</p>
                        <p>Already a member?</p>
                        <OpenModalMenuItem
                            itemText="Log In"
                            className={"landing-link"}
                            onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />
                    </div>

                </div>

                <div className="landing-description">
                    <p style={{"fontSize": "16px"}}>Dumblr is a blogging website where you can share your interests, ideas, and images with other users in a intuitive and customizable way!</p>
                </div>

            </div>
        </div>
    )
}