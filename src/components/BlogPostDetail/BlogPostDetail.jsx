import React from "react";
import DOMPurify from "dompurify";
import styles from "./BlogPostDetail.module.css";

const BlogPostDetail = ({ title, content, author, date }) => {
  if (!title || !content || !author || !date) {
    return <p>Blog post not found.</p>;
  }

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",

    day: "numeric",

    year: "numeric",
  });

  // Sanitize content using DOMPurify
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div className={styles.blogPostDetail}>
      <h1 className={styles.title}>{title}</h1>

      <p className={styles.author}>By {author}</p>

      <p className={styles.date}>Published on {formattedDate}</p>

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </div>
  );
};

export default BlogPostDetail;
