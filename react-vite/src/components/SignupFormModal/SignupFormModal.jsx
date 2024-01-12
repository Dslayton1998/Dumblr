import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.length < 4) {
      return setErrors({
        username:
          "Username must me at least 4 characters.",
      });
    }

    if (password.length < 8) {
      return setErrors({
        password:
          "Password must be at least 8 characters.",
      });
    }

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Password fields do not match.",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="sign-up-container">
      <h1 className="sign-up-header">Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <label className="sign-up-input">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required
          />
        <div className="error-container">
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
        </label>


        <label className="sign-up-input">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            // required
          />
        <div className="error-container">
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
        </label>


        <label className="sign-up-input">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
          <div className="error-container">
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
        </label>


        <label className="sign-up-input">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            // required
          />
        <div className="error-container">
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>
        </label>


        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
