import React from 'react';
import { useQuery } from 'react-query';

function PostsComponent() {
  const { data, isLoading, error, refetch } = useQuery('posts', () =>
    fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json())
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts!</p>;

  return (
    <div>
      <button onClick={refetch}>Refetch Posts</button>
      <ul>
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostsComponent;
