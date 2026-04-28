import React, { useContext, useEffect, useRef, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";
import { gsap } from "gsap";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName]     = useState("");
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer]     = useState("");
  const [error, setError]           = useState("");
  const [loading, setLoading]       = useState(false);
  const { updateUser }              = useContext(UserContext);
  const navigate                    = useNavigate();
  const formRef                     = useRef(null);

  useEffect(() => {
    if (!formRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".form-row",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out", clearProps: "all" }
      );
    }, formRef);
    return () => ctx.revert();
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
    if (!fullName)              { setError("Please enter your full name"); return; }
    if (!validateEmail(email))  { setError("Please enter a valid email address"); return; }
    if (!password)              { setError("Please enter the password"); return; }
    if (!securityQuestion)      { setError("Please select a security question"); return; }
    if (!securityAnswer.trim()) { setError("Please enter an answer to the security question"); return; }
    setError("");
    setLoading(true);
    try {
      if (profilePic) {
        const res = await uploadImage(profilePic);
        profileImageUrl = res.imageUrl || "";
      }
      const { data } = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
        securityQuestion,
        securityAnswer,
      });
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
        <div className="form-row mb-5">
          <h3 className="text-2xl font-bold" style={{ color: "var(--text-1)" }}>
            Create an account
          </h3>
          <p className="text-sm mt-1" style={{ color: "var(--text-3)" }}>
            Join us today and take control of your finances
          </p>
        </div>

        <form onSubmit={handleSignUp} className="flex flex-col gap-1">
          <div className="form-row">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          </div>

          <div className="form-row">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John Doe"
              type="text"
            />
          </div>

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
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Minimum 8 characters"
              type="password"
            />
          </div>

          {/* Security Question */}
          <div className="form-row">
            <label
              className="text-xs font-medium block mb-1"
              style={{ color: "var(--text-2)" }}
            >
              Security Question
            </label>
            <select
              value={securityQuestion}
              onChange={({ target }) => setSecurityQuestion(target.value)}
              className="w-full px-3 py-2 rounded-xl text-sm outline-none"
              style={{
                background: "var(--bg-input)",
                border: "1px solid var(--border)",
                color: securityQuestion ? "var(--text-1)" : "var(--text-3)",
              }}
            >
              <option value="">Select a security question…</option>
              <option value="What was the name of your first pet?">What was the name of your first pet?</option>
              <option value="What was the name of your elementary school?">What was the name of your elementary school?</option>
              <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
              <option value="What city were you born in?">What city were you born in?</option>
              <option value="What was the make of your first car?">What was the make of your first car?</option>
              <option value="What is the name of your favorite childhood friend?">What is the name of your favorite childhood friend?</option>
              <option value="What street did you grow up on?">What street did you grow up on?</option>
            </select>
          </div>

          <div className="form-row">
            <Input
              value={securityAnswer}
              onChange={({ target }) => setSecurityAnswer(target.value)}
              label="Security Answer"
              placeholder="Your answer (case-insensitive)"
              type="text"
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
              {loading ? "Creating account…" : "CREATE ACCOUNT"}
            </button>
          </div>

          <p className="form-row text-xs text-center mt-4" style={{ color: "var(--text-3)" }}>
            Already have an account?{" "}
            <Link className="font-semibold" style={{ color: "var(--accent)" }} to="/login">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
