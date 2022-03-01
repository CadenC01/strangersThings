import { Link, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Home from "./Home";
import Posts from "./Posts";
import Register from "./Register";

import Login from "./Login";
import Profile from "./Profile";

export const API =
  "https://strangers-things.herokuapp.com/api/2110-FTB-ET-WEB-PT/";

const App = (props) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [msgs, setMsgs] = useState([]);

  const fetchposts = async () => {
    if (localStorage.getItem("token")) {
      const responce = await fetch(API + `posts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const info = await responce.json();
      setPosts(info.data.posts);
    } else {
      const responce = await fetch(API + `posts`);
      const info = await responce.json();
      setPosts(info.data.posts);
    }
  };

  const fetchMsg = async () => {
    if (localStorage.getItem("token")) {
      const responce = await fetch(API + `posts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const info = await responce.json();
      setMsgs(info.data.posts);
    } else {
      const responce = await fetch(API + `posts`);
      const info = await responce.json();
      setMsgs(info.data.posts);
    }
  };

  const fetchUser = async () => {
    const lsToken = localStorage.getItem("token");
    if (lsToken) {
      setToken(lsToken);
    }
    const resp = await fetch(`${API}/users/me`, {
      headers: {
        Authorization: `Bearer ${lsToken}`,
      },
    });
    const info = await resp.json();
    if (info.success) {
    }
    setUser(info.data);
  };

  useEffect(() => {
    fetchUser();
    fetchposts();
  }, [token]);

  return (
    <div id="container">
      <div id="navbar">
        <h1>Stranger's Things</h1>
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/Posts">
          Posts
        </Link>
        {token ? null : (
          <Link className="nav-link" to="/Register">
            Login/Register
          </Link>
        )}
        {token ? (
          <Link className="nav-link" to="/Profile">
            Profile
          </Link>
        ) : null}
        {token ? (
          <Link
            className="nav-link"
            to="/"
            onClick={() => {
              setToken("");
              setUser({});
              localStorage.removeItem("token");
            }}
          >
            Log out
          </Link>
        ) : null}
      </div>

      <div id="main-section">
        <Route exact path="/">
          <Home user={user} />
        </Route>
        <Route exact path="/Posts">
          <Posts posts={posts} token={token} />
        </Route>
        <Route exact path="/Register">
          <Register setToken={setToken} />
        </Route>
        <Route exact path="/Login">
          <Login setToken={setToken} />
        </Route>
        <Route exact path="/Profile">
          <Profile
            token={token}
            posts={posts}
            fetchposts={fetchposts}
            user={user}
          />
        </Route>
      </div>
    </div>
  );
};

export default App;
