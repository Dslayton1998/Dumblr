import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import './Footer.css'

export default function Footer() {
    return (
        <div className="footer-container">
            <div className="about-links">
                <a href="https://github.com/Dslayton1998"><FaGithubSquare className="icons" /></a>
                <p>Created by Derek Slayton</p>
                <a href="https://www.linkedin.com/in/derek-slayton-078b672aa/"><FaLinkedin className="icons" /></a>
            </div>
        
        </div>
    )
}