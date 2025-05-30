import React from "react";
import BlogPostItem from "../BlogPostItem/BlogPostItem";
import styles from "./BlogPostList.module.css";

const BlogPostList = ({ posts, onSelect }) => {
  if (!posts || posts.length === 0) {
    return <p className={styles.noPosts}>No blog posts available.</p>;
  }

  return (
    <div className={styles.blogPostList}>
      {posts.map((post) => (
        <BlogPostItem
          key={post.id}
          id={post.id}
          title={post.title}
          summary={post.summary}
          date={post.date}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default BlogPostList;
