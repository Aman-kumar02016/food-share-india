import { SurplusPost, DashboardStats } from './types';

const STORAGE_KEY = 'anndaata_surplus_posts';

export const getStoredPosts = (): SurplusPost[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const savePosts = (posts: SurplusPost[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

export const addPost = (post: SurplusPost): void => {
  const posts = getStoredPosts();
  posts.unshift(post);
  savePosts(posts);
};

export const claimPost = (postId: string, claimedBy: string): void => {
  const posts = getStoredPosts();
  const updated = posts.map(post =>
    post.id === postId ? { ...post, claimed: true, claimedBy } : post
  );
  savePosts(updated);
};

export const getDashboardStats = (): DashboardStats => {
  const posts = getStoredPosts();
  const uniqueDonors = new Set(posts.map(p => p.donorName)).size;
  
  return {
    totalPosts: posts.length,
    totalClaimed: posts.filter(p => p.claimed).length,
    totalServings: posts.reduce((sum, p) => sum + p.servings, 0),
    activeDonors: uniqueDonors,
  };
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
