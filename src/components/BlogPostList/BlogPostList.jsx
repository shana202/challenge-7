import React from "react";
import BlogPostItem from "../BlogPostItem/BlogPostItem";
import styles from "./BlogPostList.module.css";

const highlightText = (text, searchTerm) => {
  if (!searchTerm) return text;

  const regex = new RegExp(`(${searchTerm})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className={styles.highlight}>
        {part}
      </span>
    ) : (
      part
    )
  );
};

const BlogPostList = ({ posts, onSelect, searchTerm }) => {
  if (!posts || posts.length === 0) {
    return <p className={styles.noPosts}>No blog posts available.</p>;
  }

  return (
    <div className={styles.blogPostList}>
       <div aria-live="polite" aria-atomic="true" className={styles.ariaStatus}>
        {posts.length} blog post{posts.length !== 1 ? "s" : ""} found.
      </div>
    
      {posts
        .filter((post) =>
          searchTerm
            ? post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              post.summary.toLowerCase().includes(searchTerm.toLowerCase())
            : true
        )
        .map((post) => (
          <BlogPostItem
            key={post.id}
            id={post.id}
            title={highlightText(post.title, searchTerm)}
            summary={highlightText(post.summary, searchTerm)}
            date={post.date}
            onSelect={onSelect}
          />
        ))}
    </div>
  );
};

export default BlogPostList;