import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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
      <div className="login-container">
        <div className="login-loading">
          <div className="spinner" />
          <p>Signing you in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
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
          <button
            type="button"
            className="toggle-btn"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={isSubmitting}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button type="submit" className="login-btn" disabled={isSubmitting}>
          Login
        </button>

        <button
          type="button"
          className="login-btn"
          onClick={handleSignUp}
          disabled={isSubmitting}
        >
          Sign Up
        </button>

        <button
          type="button"
          className="google-login"
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
        >
          <div className="google-logo-placeholder" />
          <span>Sign in with Google</span>
        </button>
      </form>
    </div>
  );
}

