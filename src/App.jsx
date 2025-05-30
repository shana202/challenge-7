import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
import BlogPostList from "./components/BlogPostList/BlogPostList";
import BlogPostDetail from "./components/BlogPostDetail/BlogPostDetail";
import BlogPostForm from "./components/BlogPostForm/BlogPostForm";
import DeleteButton from "./components/DeleteButton/DeleteButton";
import ConfirmationDialog from "./components/ConfirmationDialog/ConfirmationDialog";
import Layout from "./components/Layout/Layout";
import CommentList from "./components/CommentList/CommentList";
import CommentForm from "./components/CommentForm/CommentForm";

const initialPosts = [
  {
    id: "1",
    title: "Getting Started with React",
    summary: "Learn the basics of React and build your first application.",
    date: "2023-01-01",
    content: `
      <p>React is a JavaScript library for building user interfaces. It's maintained by Facebook and a community of developers.</p>
      <h2>Why React?</h2>
      <p>React makes it easy to create interactive UIs. It efficiently updates and renders just the right components when your data changes.</p>
      <ul>
        <li>Component-based</li>
        <li>Declarative</li>
        <li>Learn Once, Write Anywhere</li>
      </ul>
    `,
    author: "John Doe",
  },
  {
    id: "2",
    title: "CSS Grid vs. Flexbox",
    summary: "A comparison of two powerful layout systems in CSS.",
    date: "2023-02-15",
    content: `
      <p>Both CSS Grid and Flexbox are modern layout systems. Choosing the right one depends on your layout needs.</p>
      <h2>CSS Grid</h2>
      <p>Best for two-dimensional layouts (rows and columns).</p>
      <h2>Flexbox</h2>
      <p>Best for one-dimensional layouts (rows <strong>or</strong> columns).</p>
      <ol>
        <li>Use Grid when you need a full page layout.</li>
        <li>Use Flexbox when you're aligning items in a single row or column.</li>
      </ol>
    `,
    author: "Jane Smith",
  },
  {
    id: "3",
    title: "Accessibility in Web Development",
    summary: "Tips for making your web applications more accessible.",
    date: "2023-03-10",
    content: `
      <p>Accessibility ensures that websites are usable by everyone, including people with disabilities.</p>
      <h2>Best Practices</h2>
      <ul>
        <li>Use semantic HTML</li>
        <li>Provide alt text for all meaningful images</li>
        <li>Ensure sufficient color contrast</li>
        <li>Use ARIA roles where appropriate</li>
      </ul>
    `,
    author: "Alex Johnson",
  },
];

const stripHtml = (html) => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const PostsPage = ({ posts }) => {
  const navigate = useNavigate();
  return (
    <div>
      <BlogPostList
        posts={posts}
        onSelect={(id) => navigate(`/posts/${id}`)}
      />
    </div>
  );
};

const PostPage = ({ posts, setPosts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === id);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [comments, setComments] = useState([
    {
      postId: "1",
      name: "Alice",
      text: "Great introduction to React!",
      date: "2023-12-25T14:45:00Z",
    },
    {
      postId: "2",
      name: "Bob",
      text: "CSS Grid helped me structure my layout perfectly.",
      date: "2024-01-05T09:30:00Z",
    },
  ]);

  const handleDelete = () => {
    const updatedPosts = posts.filter((p) => p.id !== id);
    setPosts(updatedPosts);
    navigate("/posts");
  };

  const handleAddComment = (comment) => {
    setComments((prev) => [
      ...prev,
      {
        ...comment,
        postId: id,
        date: new Date().toISOString(),
      },
    ]);
  };

  if (!post) return <p>Blog post not found.</p>;

  return (
    <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}>
      <button
        onClick={() => navigate(`/posts/${id}/edit`)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "10px 15px",
          fontSize: "14px",
          marginRight: "40px",
          marginTop: "45px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Edit Post
      </button>

      <BlogPostDetail {...post} />

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <DeleteButton onClick={() => setIsDialogOpen(true)} />
      </div>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDelete}
      />

      <div style={{ marginTop: "40px" }}>
        <h3 style={{ color: "#000" }}>Comments</h3>
        <CommentList comments={comments.filter((c) => c.postId === id)} />
        <CommentForm
          onSubmit={handleAddComment}
          isLoggedIn={false}
          userName=""
        />
      </div>
    </div>
  );
};

const CreatePost = ({ onCreate }) => {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    onCreate(data);
    navigate("/posts");
  };

  return <BlogPostForm onSubmit={handleSubmit} />;
};

const EditPost = ({ posts, onUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === id);

  if (!post) return <p>Post not found.</p>;

  const handleSubmit = (data) => {
    onUpdate(id, data);
    navigate(`/posts/${id}`);
  };

  return <BlogPostForm post={post} onSubmit={handleSubmit} />;
};

const App = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCreatePost = (newPost) => {
    const newId = (posts.length + 1).toString();
    const summary = stripHtml(newPost.content).slice(0, 60) + "...";
    const updated = [...posts, { ...newPost, id: newId, summary }];
    setPosts(updated);
    setFilteredPosts(updated);
  };

  const handleUpdatePost = (id, updatedPost) => {
    const updatedPosts = posts.map((p) =>
      p.id === id
        ? {
            ...p,
            ...updatedPost,
            summary: stripHtml(updatedPost.content).slice(0, 60) + "...",
          }
        : p
    );
    setPosts(updatedPosts);
    setFilteredPosts(updatedPosts);
  };


  return (
    <Router>
      <Layout>
        <div>
          <h2 style={{ textAlign: "center", marginTop: "20px" }}>Blog Posts</h2>
          ;
          <Routes>
            <Route
              path="/posts"
              element={
                <PostsPage posts={filteredPosts} searchTerm={searchTerm} />
              }
            />

            <Route
              path="/posts/new"
              element={<CreatePost onCreate={handleCreatePost} />}
            />
            <Route
              path="/posts/:id"
              element={<PostPage posts={posts} setPosts={setPosts} />}
            />
            <Route
              path="/posts/:id/edit"
              element={<EditPost posts={posts} onUpdate={handleUpdatePost} />}
            />
            <Route path="*" element={<Navigate to="/posts" replace />} />
          </Routes>
        </div>
      </Layout>
    </Router>
  );
};

export default App;
