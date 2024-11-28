import React from "react";
import { Link } from "react-router-dom";
import { LoginSocialGoogle } from "reactjs-social-login";
import "./login.css";
import useLogin from "../login/useLogin";

const Login = () => {
  const { LoginResponse, handleChange, handleLogin } = useLogin();

  const handleGoogleLoginSuccess = ({ provider, data }) => {
    console.log("Google Login Success", provider, data);
  };

  const handleGoogleLoginFailure = (error) => {
    console.log("Google Login Failed", error);
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2 className="text-center">Login</h2>
        {LoginResponse?.error && (
          <p className="text-danger text-center">{LoginResponse?.error}</p>
        )}
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={LoginResponse?.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={LoginResponse?.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={LoginResponse?.loading}
        >
          {LoginResponse?.loading ? "Logging in..." : "Login"}
        </button>
        <div className="text-center mt-3 d-flex justify-content-center">
          <LoginSocialGoogle
            client_id="598224223672-0m2aqdr798n6q4u36s747ob7lgvl5gdd.apps.googleusercontent.com"
            onResolve={handleGoogleLoginSuccess}
            onReject={handleGoogleLoginFailure}
            className="text-center"
          >
            <button className="google-login-btn">
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google Logo"
                className="google-logo"
              />
              Sign in with Google
            </button>
          </LoginSocialGoogle>
        </div>
        <p className="text-center mt-3">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
        <p className="text-center mt-3">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
