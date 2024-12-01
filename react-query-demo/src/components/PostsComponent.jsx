import React from 'react';
import { useQuery } from 'react-query';

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

function PostsComponent() {
  const { data, error, isError, isLoading, refetch } = useQuery('posts', fetchPosts, {
    cacheTime: 1000 * 60 * 5, // Cache data for 5 minutes
    staleTime: 1000 * 60 * 1, // Consider data fresh for 1 minute
    refetchOnWindowFocus: false, // Disable refetching on window focus
    keepPreviousData: true, // Keep previous data while fetching new data
  });

  const handleRefetch = () => {
    refetch(); // Refetch posts manually
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      <button onClick={handleRefetch}>Refetch Posts</button>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsComponent;