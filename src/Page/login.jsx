import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const adminUsername = "Dwiwahyu06";
  const adminPassword = "098765";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    
    const isFirstLetterUppercase =
      username.charAt(0) === username.charAt(0).toUpperCase();
    const hasNoSpaces = !/\s/.test(username);

    if (!isFirstLetterUppercase) {
      setError("Huruf pertama username harus besar.");
      return;
    }

    if (!hasNoSpaces) {
      setError("Username tidak boleh mengandung spasi.");
      return;
    }

    if (username === adminUsername && password === adminPassword) {
      alert("Login Berhasil! Selamat datang, Admin.");
      navigate("/Resep");
    } else {
      setError("Username atau password salah");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <h2>Login Admin</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="toggle-password-btn"
            >
              {showPassword ? "Sembunyikan" : "Lihat"}
            </button>
          </div>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
