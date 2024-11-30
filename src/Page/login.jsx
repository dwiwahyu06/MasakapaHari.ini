
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from '../context/AppContext';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { setIsLoggedIn } = useAppContext(); 
  const adminUsername = "Dwiwahyu06";
  const adminPassword = "dwi12345";

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

 
    const hasNoSpacesInPassword = !/\s/.test(password);
    const isPasswordLengthValid = password.length <= 10;
    const isValidPasswordPattern = /^[a-z]{3}[0-9]*$/.test(password);

    if (!hasNoSpacesInPassword) {
      setError("Password tidak boleh mengandung spasi.");
      return;
    }

    if (!isPasswordLengthValid) {
      setError("Password maksimal 10 karakter.");
      return;
    }

    if (!isValidPasswordPattern) {
      setError("Password harus dimulai dengan 3 huruf kecil dan dapat dilanjutkan dengan angka.");
      return;
    }

    if (username === adminUsername && password === adminPassword) {
      alert("Login Berhasil! Selamat datang, Admin.");
      setIsLoggedIn(true);
      navigate("/Resep");  
    } else {
      setError("Username atau password salah");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>MasakApaHari.ini</h1>
          <h2>Login Admin</h2>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-button">
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
