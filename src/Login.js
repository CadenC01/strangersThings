import { useState } from "react/cjs/react.development";
import { API } from "./App";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

const Login = (props) => {
  const setToken = props.setToken;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    const resp = await fetch(`${API}/users/login`, {
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
    setToken(info.data.token);
    localStorage.setItem("token", info.data.token);
    history.push("/");
  };

  return (
    <div className="register">
      <form className="form" onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
