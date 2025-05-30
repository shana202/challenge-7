// src/components/CommentForm/CommentForm.jsx
import React, { useState } from "react";
import styles from "./CommentForm.module.css";

const CommentForm = ({ onSubmit, isLoggedIn, userName }) => {
  const [name, setName] = useState(userName || "");
  const [text, setText] = useState("");
  const [avatar, setAvatar] = useState(""); 
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim() || (!isLoggedIn && !name.trim())) {
      setError("Please fill out all required fields.");
      return;
    }

    const newComment = {
      id: Date.now(),
      name: isLoggedIn ? userName : name,
      date: new Date().toISOString(),
      text,
      avatar: avatar.trim() || undefined,
    };

    onSubmit(newComment);
    setText("");
    setAvatar("");
    if (!isLoggedIn) setName("");
    setError("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} aria-live="polite">
      {!isLoggedIn && (
        <div className={styles.fieldGroup}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      )}

      <div className={styles.fieldGroup}>
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="avatar">Avatar URL (optional)</label>
        <input
          id="avatar"
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="https://example.com/avatar.jpg"
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
