import React from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>My Project</h1>
      <PostForm />
      <PostList />
      <ContactForm />
      <ContactList />
    </div>
  );
}

export default App;
