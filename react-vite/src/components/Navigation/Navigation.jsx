import ProfileButton from "./ProfileButton";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHome } from "react-icons/fa";
import "./Navigation.css";

function Navigation() {
  const user = useSelector(state => state.session.user)

  if (user == null) {
    return (
      <div className="nav-container">
        <div className="nav-component">
          <NavLink to="/"><FaHome className="home-button" style={{"fontSize": "x-large"}}/></NavLink>
        </div>

        <div className="nav-component">
          <NavLink className="nav-link" to="/Dashboard">Dashboard</NavLink>
        </div>

        <div className="nav-component">
          <ProfileButton className="nav-link" />
        </div>
    </div>
    )
  }

  return (
    <div className="nav-container">

      <div className="nav-component">
        <NavLink className="nav-link" to="/Dashboard">Dashboard</NavLink>
      </div>

      <div className="nav-component">
        <NavLink className="nav-link" to="/blog/new">Create blog</NavLink>
      </div>

      <div className="nav-component">
        <NavLink className="nav-link" to="/post/new">Create post</NavLink>
      </div>

      <div className="nav-component">
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
