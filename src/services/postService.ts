/**
 * API Service for fetching posts from JSONPlaceholder
 */

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface ApiResponse {
  success: boolean;
  data?: Post[];
  error?: string;
}

export const postService = {
  /**
   * Fetch all posts from the API
   */
  async fetchPosts(): Promise<ApiResponse> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data: Post[] = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Invalid API response');
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unable to fetch posts. Check your network connection.';

      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  /**
   * Filter posts by search term (case-insensitive)
   */
  filterPosts(posts: Post[], searchTerm: string): Post[] {
    if (!searchTerm.trim()) {
      return posts;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();

    return posts.filter((post) =>
      post.title.toLowerCase().includes(lowerSearchTerm) ||
      post.body.toLowerCase().includes(lowerSearchTerm)
    );
  },
};
