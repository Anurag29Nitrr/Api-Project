import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import PostList from './components/PostList';
import ContactForm from './components/ContactForm';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/posts" element={<PostList />} />
        {/* <Route path="/post/:id" element={<PostDetail />} /> */}
        <Route path="/contact" element={<ContactForm />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
