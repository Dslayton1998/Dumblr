import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/Dashboard">Dashboard</NavLink>
      </li>

      <li>
        <NavLink to="/blog/new">Create blog</NavLink>
      </li>

      <li>
        <NavLink to="/post/new">Create post</NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
