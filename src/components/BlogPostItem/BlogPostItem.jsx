import React from "react";
import styles from "./BlogPostItem.module.css";

const BlogPostItem = ({ id, title, summary, date, onSelect }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.blogPostItem}>
      <div
        className={styles.postTitle}
        onClick={() => onSelect && onSelect(id)}
        style={{ cursor: "pointer" }}
      >
        <h3>{title}</h3>
      </div>
      <p className={styles.summary}>{summary}</p>
      <p className={styles.date}>Published on {formattedDate}</p>
    </div>
  );
};

export default BlogPostItem;
