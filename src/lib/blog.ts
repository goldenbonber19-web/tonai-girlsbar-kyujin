import type { BlogPost } from "@/types";
import articles1to5   from "@/data/blog/articles-1-5.json";
import articles6to10  from "@/data/blog/articles-6-10.json";
import articles11to15 from "@/data/blog/articles-11-15.json";
import articles16to20 from "@/data/blog/articles-16-20.json";

const ALL_POSTS: BlogPost[] = [
  ...(articles1to5   as BlogPost[]),
  ...(articles6to10  as BlogPost[]),
  ...(articles11to15 as BlogPost[]),
  ...(articles16to20 as BlogPost[]),
];

export function getAllPosts(): BlogPost[] {
  return ALL_POSTS;
}

export function getPostBySlug(slug: string): BlogPost | null {
  return ALL_POSTS.find((p) => p.slug === slug) ?? null;
}

export function getPostsByCategory(category: string): BlogPost[] {
  return ALL_POSTS.filter((p) => p.category === category);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return ALL_POSTS.filter(
    (p) =>
      p.slug !== post.slug &&
      (p.category === post.category ||
        p.tags.some((t) => post.tags.includes(t)))
  ).slice(0, limit);
}
