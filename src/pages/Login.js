import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const DEFAULT_USER = {
  username: "Pramodh",
  password: "Pramodh@28",
  name: "Pramodh",
  role: "Admin",
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    setLoading(true);
    console.log(username, password, "Pramodh@28");
    setTimeout(() => {
      if (
        username === DEFAULT_USER.username &&
        password === DEFAULT_USER.password
      ) {
        login({
          username: DEFAULT_USER.username,
          name: DEFAULT_USER.name,
          role: DEFAULT_USER.role,
          token: "mock-jwt-token-123456",
        });
      } else {
        alert("Invalid Username or Password");
      }

      setLoading(false);
    }, 800);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f6fa",
      }}
    >
      <div
        style={{
          width: 320,
          padding: 30,
          background: "#fff",
          borderRadius: 10,
          boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          Employee Login
        </h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleLogin} disabled={loading} style={buttonStyle}>
          {loading ? "Authenticating..." : "Login"}
        </button>

        {/* <p style={{ marginTop: 15, fontSize: 12, color: "#888" }}>
          Demo Credentials: <br />
          Username: <b>Pramodh</b> <br />
          Password: <b>Pramodh@28</b>
        </p> */}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 10,
  marginBottom: 12,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: 10,
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};
