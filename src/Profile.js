import { useEffect, useState } from "react";
import { API } from "./App";

const Profile = (props) => {
  const posts = props.posts;
  const token = props.token;

  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [price, setPrice] = useState("");

  const handleDelete = (e) => {
    fetch(`${API}/posts/${e}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const handleNewP = (e) => {
    fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
        },
      }),
    });
  };

  useEffect(() => {}, []);
  return (
    <div id="Profile">
      <form className="form" onSubmit={handleNewP}>
        <input
          required
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <input
          required
          placeholder="Enter Desctiption"
          value={description}
          onChange={(e) => setDesc(e.target.value)}
        ></input>
        <input
          required
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></input>
        <button type="submit">Submit New Post</button>
      </form>
      <div>
        {posts.map((e) => {
          if (e.isAuthor) {
            return (
              <div key={e._id} id="postss">
                <h1 className="post-title">{e.title}</h1>
                <p className="post-desc">{e.description}</p>
                <p className="post-desc">{e.price}</p>
                <button type="button" onClick={handleDelete(e._id)}>
                  Delete Post
                </button>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Profile;
