import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import "./Navigation.css";

function Navigation() {
  const user = useSelector(state => state.session.user)
  // todo: render elements based off of session status

  if (user == null) {
    return (
      <div className="nav-container">
        <div className="nav-component">
          {/* needs a logo */}
          <NavLink className="nav-link" to="/">Home</NavLink>
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
