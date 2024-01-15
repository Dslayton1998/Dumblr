import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/dashboard");
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault()

    const serverResponse = await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password"
      })
    )
    if(serverResponse){
      setErrors(serverResponse)
    } else {
      navigate('/dashboard')
      closeModal()
    }
  };

  return (
    <div className="login-page">
      <div className="login-page-container">
        <h1 className="login-page-header">Log In</h1>
        <form className="login-page-form" onSubmit={handleSubmit}>
          <label className="login-page-input">
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


          <label  className="login-page-input">
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

          <button className="submit-button" onClick={demoLogin}>Demo User</button>
          <button className='submit-button' type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
