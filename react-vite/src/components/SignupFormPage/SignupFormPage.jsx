import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkSignup } from "../../redux/session";
import { useState } from "react";
import "./SignupForm.css"

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.length < 4) {
      return setErrors({
        username:
          "Username must be at least 4 characters.",
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
      navigate("/dashboard");
    }
  };

  return (
    <div className="sign-up-page">
      <div className="sign-up-page-container">
        <h1 className="sign-up-page-header">Sign Up</h1>
        {errors.server && <p>{errors.server}</p>}
        <form className="sign-up-page-form" onSubmit={handleSubmit}>

          <label className="sign-up-page-input">
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


          <label className="sign-up-page-input">
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


          <label className="sign-up-page-input">
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


          <label className="sign-up-page-input">
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

          <button className='submit-button' type="submit">Sign Up</button>
          
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
