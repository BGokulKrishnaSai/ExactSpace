/**
 * Custom hook for fetching posts with error handling
 */

import { useState, useEffect } from 'react';
import { postService } from '../services/postService';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface UseFetchPostsReturn {
  posts: Post[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useFetchPosts = (): UseFetchPostsReturn => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    const response = await postService.fetchPosts();

    if (response.success && response.data) {
      setPosts(response.data);
    } else {
      setError(response.error || 'Failed to fetch posts');
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts,
  };
};
