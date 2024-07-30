import React, { useEffect, useState } from 'react';
import { getPosts, supportPost, notSupportPost } from '../api';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleSupport = async (id) => {
    try {
      await supportPost(id);
      setPosts(posts.map(post => post._id === id ? { ...post, supports: post.supports + 1 } : post));
    } catch (error) {
      console.error('Error supporting post:', error);
    }
  };

  const handleNotSupport = async (id) => {
    try {
      await notSupportPost(id);
      setPosts(posts.map(post => post._id === id ? { ...post, supports: post.supports - 1 } : post));
    } catch (error) {
      console.error('Error not supporting post:', error);
    }
  };

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <h3>{post.name || 'Anonymous'}</h3>
            <p>{post.story}</p>
            <p>Supports: {post.supports}</p>
            <button onClick={() => handleSupport(post._id)}>Support</button>
            <button onClick={() => handleNotSupport(post._id)}>Not Support</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
