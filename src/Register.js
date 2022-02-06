import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Login from "./Login";
import { useState } from "react/cjs/react.development";
import { API } from "./App";
import { Link, Route } from "react-router-dom";

const Register = (props) => {
  const setToken = props.setToken;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    const resp = await fetch(`${API}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    const info = await resp.json();
    console.log(info);
    if (info.error) {
      setError(info.error.message);
    }
    //save token
    setToken(info.data.token);
    localStorage.setItem("token", info.data.token);

    history.push("/");
  };

  return (
    <div className="register">
      <p>
        If you already have an account <Link to="/Login">login</Link>
      </p>
      <p className="err-msg">{error}</p>
      <form className="form" onSubmit={handleRegister}>
        <input
          required
          minLength={4}
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          required
          minLength={4}
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          required
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        ></input>
        <button type="submit">Register</button>
      </form>
      <p className="err-msg">{error}</p>
    </div>
  );
};

export default Register;
