import React, { useEffect, useRef, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { gsap } from "gsap";

// Step labels
const STEPS = ["email", "answer", "success"];

const ForgotPassword = () => {
  const [step, setStep]                     = useState("email"); // email | answer | success
  const [email, setEmail]                   = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword]       = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError]                   = useState("");
  const [loading, setLoading]               = useState(false);
  const formRef                             = useRef(null);
  const navigate                            = useNavigate();

  // Animate rows on step change
  useEffect(() => {
    if (!formRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".form-row",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.45, ease: "power3.out", clearProps: "all" }
      );
    }, formRef);
    return () => ctx.revert();
  }, [step]);

  // Step 1 – fetch security question
  const handleFetchQuestion = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(
        API_PATHS.AUTH.FORGOT_PASSWORD_QUESTION,
        { email }
      );
      setSecurityQuestion(data.securityQuestion);
      setStep("answer");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2 – verify answer + set new password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!securityAnswer.trim()) { setError("Please answer the security question."); return; }
    if (!newPassword)            { setError("Please enter a new password."); return; }
    if (newPassword.length < 8)  { setError("Password must be at least 8 characters."); return; }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await axiosInstance.post(API_PATHS.AUTH.RESET_PASSWORD, {
        email,
        securityAnswer,
        newPassword,
      });
      setStep("success");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div ref={formRef}>
        {/* ─── Step 1: Enter Email ─── */}
        {step === "email" && (
          <>
            <div className="form-row mb-7">
              <h3 className="text-2xl font-bold" style={{ color: "var(--text-1)" }}>
                Forgot Password
              </h3>
              <p className="text-sm mt-1" style={{ color: "var(--text-3)" }}>
                Enter your email and we'll show your security question.
              </p>
            </div>

            <form onSubmit={handleFetchQuestion} className="flex flex-col gap-1">
              <div className="form-row">
                <Input
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                  label="Email Address"
                  placeholder="john@example.com"
                  type="text"
                />
              </div>

              {error && <ErrorBox message={error} />}

              <div className="form-row mt-2">
                <button
                  type="submit"
                  className="btn-primary flex items-center justify-center gap-2"
                  disabled={loading}
                  style={{ opacity: loading ? 0.75 : 1, cursor: loading ? "not-allowed" : "pointer" }}
                >
                  {loading && <Spinner />}
                  {loading ? "Looking up…" : "CONTINUE"}
                </button>
              </div>

              <p className="form-row text-xs text-center mt-4" style={{ color: "var(--text-3)" }}>
                Remembered it?{" "}
                <Link className="font-semibold" style={{ color: "var(--accent)" }} to="/login">
                  Sign in
                </Link>
              </p>
            </form>
          </>
        )}

        {/* ─── Step 2: Answer Security Question + New Password ─── */}
        {step === "answer" && (
          <>
            <div className="form-row mb-7">
              <h3 className="text-2xl font-bold" style={{ color: "var(--text-1)" }}>
                Verify Identity
              </h3>
              <p className="text-sm mt-1" style={{ color: "var(--text-3)" }}>
                Answer your security question, then set a new password.
              </p>
            </div>

            <form onSubmit={handleResetPassword} className="flex flex-col gap-1">
              {/* Security Question (read-only display) */}
              <div className="form-row">
                <label
                  className="text-xs font-medium block mb-1"
                  style={{ color: "var(--text-2)" }}
                >
                  Security Question
                </label>
                <div
                  className="w-full px-3 py-2 rounded-xl text-sm"
                  style={{
                    background: "var(--bg-input)",
                    border: "1px solid var(--border)",
                    color: "var(--text-1)",
                  }}
                >
                  {securityQuestion}
                </div>
              </div>

              <div className="form-row">
                <Input
                  value={securityAnswer}
                  onChange={({ target }) => setSecurityAnswer(target.value)}
                  label="Your Answer"
                  placeholder="Answer (case-insensitive)"
                  type="text"
                />
              </div>

              <div className="form-row">
                <Input
                  value={newPassword}
                  onChange={({ target }) => setNewPassword(target.value)}
                  label="New Password"
                  placeholder="Minimum 8 characters"
                  type="password"
                />
              </div>

              <div className="form-row">
                <Input
                  value={confirmPassword}
                  onChange={({ target }) => setConfirmPassword(target.value)}
                  label="Confirm New Password"
                  placeholder="Repeat your new password"
                  type="password"
                />
              </div>

              {error && <ErrorBox message={error} />}

              <div className="form-row mt-2">
                <button
                  type="submit"
                  className="btn-primary flex items-center justify-center gap-2"
                  disabled={loading}
                  style={{ opacity: loading ? 0.75 : 1, cursor: loading ? "not-allowed" : "pointer" }}
                >
                  {loading && <Spinner />}
                  {loading ? "Resetting…" : "RESET PASSWORD"}
                </button>
              </div>

              <button
                type="button"
                className="form-row text-xs text-center mt-2"
                style={{ color: "var(--text-3)", background: "none", border: "none", cursor: "pointer" }}
                onClick={() => { setStep("email"); setError(""); }}
              >
                ← Change email
              </button>
            </form>
          </>
        )}

        {/* ─── Step 3: Success ─── */}
        {step === "success" && (
          <div className="flex flex-col items-center gap-5 py-4">
            <div
              className="form-row w-16 h-16 rounded-full flex items-center justify-center text-3xl"
              style={{ background: "var(--green-dim, #d1fae5)" }}
            >
              ✓
            </div>
            <div className="form-row text-center">
              <h3 className="text-2xl font-bold" style={{ color: "var(--text-1)" }}>
                Password Reset!
              </h3>
              <p className="text-sm mt-1" style={{ color: "var(--text-3)" }}>
                Your password has been updated successfully.
              </p>
            </div>
            <div className="form-row w-full">
              <button
                className="btn-primary w-full"
                onClick={() => navigate("/login")}
              >
                GO TO LOGIN
              </button>
            </div>
          </div>
        )}
      </div>
    </AuthLayout>
  );
};

// ── Shared helpers ──
const Spinner = () => (
  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
);

const ErrorBox = ({ message }) => (
  <div
    className="form-row text-xs px-3 py-2 rounded-xl"
    style={{
      color: "var(--red)",
      background: "var(--red-dim)",
      border: "1px solid var(--red)",
    }}
  >
    {message}
  </div>
);

export default ForgotPassword;
