import { useState } from "react";

const initialPosts = [
  {
    id: 1,
    title: "Welcome to SocialSpace",
    content: "Share ideas, updates and useful thoughts with your community.",
    author: "Alex",
    time: "Just now",
    likes: 12
  },
  {
    id: 2,
    title: "Building something new",
    content: "Small projects become great products when you keep improving them.",
    author: "Maya",
    time: "2h ago",
    likes: 8
  }
];

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(initialPosts);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showComposer, setShowComposer] = useState(false);

  const login = (role) => {
    if (!username.trim()) return;
    setUser({ username: username.trim(), role });
  };

  const logout = () => {
    setUser(null);
    setUsername("");
    setShowComposer(false);
  };

  const createPost = () => {
    if (!title.trim() || !content.trim()) return;

    const newPost = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      author: user.username,
      time: "Just now",
      likes: 0
    };

    setPosts([newPost, ...posts]);
    setTitle("");
    setContent("");
    setShowComposer(false);
  };

  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  if (!user) {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="brand">Social<span>Space</span></div>
          <p className="tagline">A simple place to share what matters.</p>

          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
          />

          <div className="login-actions">
            <button
              className="primary"
              disabled={!username.trim()}
              onClick={() => login("Admin")}
            >
              Continue as Admin
            </button>

            <button
              className="secondary"
              disabled={!username.trim()}
              onClick={() => login("Viewer")}
            >
              Continue as Viewer
            </button>
          </div>

          <p className="login-note">
            Admins can create and delete posts. Viewers have read-only access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="brand small">Social<span>Space</span></div>

        <div className="nav-user">
          <div className="avatar">{user.username.charAt(0).toUpperCase()}</div>
          <div>
            <strong>{user.username}</strong>
            <small>{user.role}</small>
          </div>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </header>

      <main className="feed">
        <section className="hero">
          <div>
            <p className="eyebrow">YOUR COMMUNITY</p>
            <h1>Good ideas deserve<br />to be shared.</h1>
            <p className="hero-text">
              Welcome back, {user.username}. Explore the latest posts from your community.
            </p>
          </div>

          {user.role === "Admin" && (
            <button className="create-btn" onClick={() => setShowComposer(true)}>
              <span>＋</span> Create Post
            </button>
          )}
        </section>

        {showComposer && user.role === "Admin" && (
          <section className="composer">
            <div className="composer-head">
              <div>
                <h2>Create a new post</h2>
                <p>Share something with your community.</p>
              </div>
              <button className="close" onClick={() => setShowComposer(false)}>×</button>
            </div>

            <input
              className="post-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What do you want to share?"
              rows="5"
            />

            <div className="composer-footer">
              <span>{content.length} characters</span>
              <div>
                <button className="cancel" onClick={() => setShowComposer(false)}>
                  Cancel
                </button>
                <button
                  className="primary post-btn"
                  disabled={!title.trim() || !content.trim()}
                  onClick={createPost}
                >
                  Publish Post
                </button>
              </div>
            </div>
          </section>
        )}

        <div className="section-heading">
          <div>
            <h2>Latest posts</h2>
            <p>{posts.length} posts in your feed</p>
          </div>
          <span className="role-pill">{user.role} access</span>
        </div>

        <section className="posts">
          {posts.map((post) => (
            <article className="post-card" key={post.id}>
              <div className="post-top">
                <div className="author">
                  <div className="post-avatar">{post.author.charAt(0).toUpperCase()}</div>
                  <div>
                    <strong>{post.author}</strong>
                    <span>{post.time}</span>
                  </div>
                </div>

                {user.role === "Admin" && (
                  <button className="delete-btn" onClick={() => deletePost(post.id)}>
                    Delete
                  </button>
                )}
              </div>

              <h3>{post.title}</h3>
              <p>{post.content}</p>

              <div className="post-bottom">
                <span>♡ {post.likes} likes</span>
                {user.role === "Viewer" && <span className="read-only">Read-only</span>}
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
