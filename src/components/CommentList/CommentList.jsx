// src/components/CommentList/CommentList.jsx
import React from "react";
import Comment from "../Comment/Comment";
import styles from "./CommentList.module.css";

const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <p className={styles.noComments}>No comments yet.</p>;
  }

  return (
    <div className={styles.commentList} aria-live="polite">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          name={comment.name}
          date={comment.date}
          text={comment.text}
          avatar={comment.avatar}
        />
      ))}
    </div>
  );
};

export default CommentList;
