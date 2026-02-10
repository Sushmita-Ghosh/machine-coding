import React from "react";

const Post = ({ data }) => {
  return (
    <div className="post-container">
      {data.map((d, index) => (
        <div className="post-item">
          <img className="image-container" src={d.thumbnail} alt={d.title} />
          <p className="title">{d.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Post;
