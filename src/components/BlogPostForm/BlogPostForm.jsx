// src/components/BlogPostForm/BlogPostForm.jsx

import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import SunEditor from "suneditor-react";
import "react-datepicker/dist/react-datepicker.css";
import "suneditor/dist/css/suneditor.min.css";
import styles from "./BlogPostForm.module.css";

const BlogPostForm = ({ post = {}, onSubmit }) => {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [author, setAuthor] = useState(post?.author || "");
  const [date, setDate] = useState(post?.date || "");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!content.trim()) newErrors.content = "Content is required.";
    if (!author.trim()) newErrors.author = "Author is required.";
    if (!date) newErrors.date = "Date is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
    } else {
      setIsSubmitting(true);
      await onSubmit({ title, content, author, date });
      setIsSubmitting(false);
      setSuccessMessage("Post created successfully!");

      if (!post || Object.keys(post).length === 0) {
        setTitle("");
        setContent("");
        setAuthor("");
        setDate("");
        setErrors({});
      }
    }
  };

  return (
    <div className={styles.blogPostFormWrapper}>
      <form className={styles.blogPostForm} onSubmit={handleSubmit} noValidate>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-describedby="title-error"
          />
          {errors.title && (
            <p id="title-error" className={styles.error}>
              {errors.title}
            </p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content">Content</label>
          <SunEditor
            name="content"
            setContents={content}
            onChange={setContent}
            setOptions={{
              height: 200,
              buttonList: [
                ["formatBlock", "bold", "italic"],
                ["list", "indent", "outdent"],
                ["undo", "redo", "removeFormat"],
              ],
            }}
            className={styles.richText}
          />
          {errors.content && (
            <p id="content-error" className={styles.error}>
              {errors.content}
            </p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="author">Author</label>
          <input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            aria-describedby="author-error"
          />
          {errors.author && (
            <p id="author-error" className={styles.error}>
              {errors.author}
            </p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="date">Publication Date</label>
          <ReactDatePicker
            id="date"
            selected={date ? new Date(date) : null}
            onChange={(date) => setDate(date.toISOString().split("T")[0])}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            className={styles.datePicker}
          />
          {errors.date && (
            <p id="date-error" className={styles.error}>
              {errors.date}
            </p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Submitting..."
            : post?.title
            ? "Update Post"
            : "Create Post"}
        </button>

        {successMessage && <p className={styles.success}>{successMessage}</p>}
      </form>
    </div>
  );
};

export default BlogPostForm;
