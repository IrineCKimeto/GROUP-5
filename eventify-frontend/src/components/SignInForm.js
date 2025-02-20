import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignInForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isRegister ? "Registering user:" : "Signing in with:", formData);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isRegister ? "Register" : "Sign In"}</h2>

        {isRegister && (
          <>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </>
        )}

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">{isRegister ? "Register" : "Sign In"}</button>

        {!isRegister && (
          <p>
            <Link to="/forgot-password">Forgot password?</Link>
          </p>
        )}

        <p>
          {isRegister ? "Already have an account?" : "New here?"}{" "}
          <button
            type="button"
            className="toggle-btn"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Sign in" : "Create an account"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;
