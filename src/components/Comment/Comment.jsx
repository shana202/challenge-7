import React from "react";
import styles from "./Comment.module.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const Comment = ({ name, date, text, avatar }) => (
  <div className={styles.comment}>
    <img
      src={
        avatar ||
        "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
      }
      alt={`${name}'s avatar`}
      className={styles.avatar}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src =
          "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg";
      }}
    />

    <div className={styles.content}>
      <div className={styles.header}>
        <strong style={{ color: "black" }}>{name}</strong>
        <span className={styles.date}>{formatDate(date)}</span>
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  </div>
);

export default Comment;
