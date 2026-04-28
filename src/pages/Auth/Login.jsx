import React, { useContext, useEffect, useRef, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import { gsap } from "gsap";

const Login = () => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState(null);
  const [loading, setLoading]   = useState(false);
  const { updateUser }          = useContext(UserContext);
  const navigate                = useNavigate();
  const formRef                 = useRef(null);

  useEffect(() => {
    if (!formRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".form-row",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.09, duration: 0.5, ease: "power3.out", clearProps: "all" }
      );
    }, formRef);
    return () => ctx.revert();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) { setError("Please enter a valid email address."); return; }
    if (!password)              { setError("Please enter the password."); return; }
    setError("");
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
      if (data.token) {
        localStorage.setItem("token", data.token);
        updateUser(data.user);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div ref={formRef}>
        {/* Heading */}
        <div className="form-row mb-7">
          <h3 className="text-2xl font-bold" style={{ color: "var(--text-1)" }}>
            Welcome back
          </h3>
          <p className="text-sm mt-1" style={{ color: "var(--text-3)" }}>
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-1">
          <div className="form-row">
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />
          </div>

          <div className="form-row">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium" style={{ color: "var(--text-2)" }}>Password</span>
              <Link
                to="/forgot-password"
                className="text-xs font-medium"
                style={{ color: "var(--accent)" }}
              >
                Forgot password?
              </Link>
            </div>
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label=""
              placeholder="Minimum 8 characters"
              type="password"
            />
          </div>

          {error && (
            <div
              className="form-row text-xs px-3 py-2 rounded-xl"
              style={{
                color: "var(--red)",
                background: "var(--red-dim)",
                border: "1px solid var(--red)",
              }}
            >
              {error}
            </div>
          )}

          <div className="form-row mt-2">
            <button
              type="submit"
              className="btn-primary flex items-center justify-center gap-2"
              disabled={loading}
              style={{ opacity: loading ? 0.75 : 1, cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading && (
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              )}
              {loading ? "Signing in…" : "SIGN IN"}
            </button>
          </div>

          <p className="form-row text-xs text-center mt-4" style={{ color: "var(--text-3)" }}>
            Don't have an account?{" "}
            <Link className="font-semibold" style={{ color: "var(--accent)" }} to="/signUp">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
