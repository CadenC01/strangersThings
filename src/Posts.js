import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { API } from "./App";
import { useEffect } from "react";

const Posts = (props) => {
  const posts = props.posts;
  const token = props.token;
  const [message, setMessage] = useState("");

  const sendMessage = (id) => {
    fetch(`${API}/posts/${id}/${message}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: {
          content: message,
        },
      }),
    });
  };

  return (
    <div className="posts">
      <div id="columnp">
        {posts.map((e) => {
          return (
            <div key={e._id} id="postss">
              <h1 className="post-title">{e.title}</h1>
              <p className="post-desc">{e.description}</p>
              <p className="post-desc">{e.price}</p>
              {token ? (
                <form onSubmit={sendMessage(e._id)}>
                  <input
                    required
                    minLength={4}
                    placeholder="Enter Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></input>
                  <button type="submit">Send</button>
                </form>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
