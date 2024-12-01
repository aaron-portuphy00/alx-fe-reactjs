import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./components/Profile";
import BlogPost from "./components/BlogPost";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile/*"
          element={
            <ProtectedRoute isAuthenticated={true}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/blog/:postId" element={<BlogPost />} />
      </Routes>
    </Router>
  );
}

export default App;
