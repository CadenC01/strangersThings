import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { API } from "./App";
import { useEffect } from "react";

const Posts = (props) => {
  const posts = props.posts;
  const token = props.token;

  const [message, setMessage] = useState("");

  const sendMessage = async (e, id) => {
    e.preventDefault();
    const sendM = await fetch(`${API}/posts/${id}/messages`, {
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
    const data = await sendM.json();
    console.log(data);
  };

  return (
    <div className="posts">
      <div id="columnp">
        {posts.map((post) => {
          return (
            <div key={post._id} id="postss">
              <h1 className="post-title">{post.title}</h1>
              <p className="post-desc">{post.description}</p>
              <p className="post-desc">{post.price}</p>
              {token ? (
                <form onSubmit={(e) => sendMessage(e, post._id)}>
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
