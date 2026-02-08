import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Showing from '../assets/show.png'
import Hiding from '../assets/hide.png'

import GoogleLogo from '../assets/google.webp'

import "./Login.css";

export function Login() {
  const { user, signInWithEmail, signUpWithEmail, signInWithGoogle } =
    useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    if(email === "" || password === "") return;
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await signInWithEmail(email, password);
    } catch (err) {
      setError(err?.message || "Failed to sign in.");
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async () => {
    if(email === "" || password === "") return;
    setError("");
    setIsSubmitting(true);

    try {
      await signUpWithEmail(email, password);
    } catch (err) {
      setError(err?.message || "Failed to sign up.");
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setIsSubmitting(true);

    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err?.message || "Failed to sign in with Google.");
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <div className="loading-container">
        <div className="login-loading">
          <div className="spinner" />
          <p>Signing you in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Sign in</h2>
        {error ? <p className="login-error">{error}</p> : null}

        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
        />

        <div className="password-row">
          <input
            className="login-input"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <div className="toggle-container">
            <img
              src = {showPassword ? Showing : Hiding}
              className="toggle-btn"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={isSubmitting}
            />
          </div>
        </div>
        <div className="button-row">
          <button className="login-btn" disabled={isSubmitting} onClick={handleSubmit}>
            Login
          </button>

          <button
            className="login-btn"
            onClick={handleSignUp}
            disabled={isSubmitting}
          >
            Sign Up
          </button>
        </div>
        <button
          type="button"
          className="google-login"
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
        >
          <img src={GoogleLogo} className="google-logo"/>
          <span className="google-login-text">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}

