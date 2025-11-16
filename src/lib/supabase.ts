import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
    storageKey: 'flourish-talents-auth',
    flowType: 'pkce'
  }
});

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          email: string;
          account_type: 'creator' | 'member';
          tier: 'free' | 'premium' | 'professional' | 'elite';
          loyalty_points: number;
          avatar_url: string | null;
          bio: string | null;
          joined_date: string;
          last_login: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          account_type?: 'creator' | 'member';
          tier?: 'free' | 'premium' | 'professional' | 'elite';
          loyalty_points?: number;
          avatar_url?: string | null;
          bio?: string | null;
        };
        Update: {
          name?: string;
          account_type?: 'creator' | 'member';
          tier?: 'free' | 'premium' | 'professional' | 'elite';
          loyalty_points?: number;
          avatar_url?: string | null;
          bio?: string | null;
          last_login?: string;
        };
      };
      media: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          media_url: string;
          media_type: string;
          thumbnail_url: string | null;
          views_count: number;
          likes_count: number;
          comments_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          title: string;
          description?: string | null;
          media_url: string;
          media_type?: string;
          thumbnail_url?: string | null;
        };
        Update: {
          title?: string;
          description?: string | null;
          media_url?: string;
          thumbnail_url?: string | null;
        };
      };
      likes: {
        Row: {
          id: string;
          user_id: string;
          media_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          media_id: string;
        };
      };
      follows: {
        Row: {
          id: string;
          follower_id: string;
          following_id: string;
          created_at: string;
        };
        Insert: {
          follower_id: string;
          following_id: string;
        };
      };
      comments: {
        Row: {
          id: string;
          user_id: string;
          media_id: string;
          content: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          media_id: string;
          content: string;
        };
        Update: {
          content?: string;
        };
      };
      activities: {
        Row: {
          id: string;
          user_id: string;
          action: string;
          description: string | null;
          activity_type: 'update' | 'follower' | 'approval' | 'achievement' | 'like' | 'comment' | 'upload';
          created_at: string;
        };
      };
      media_content: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          creator_name: string;
          description: string | null;
          thumbnail_url: string;
          duration: string | null;
          read_time: string | null;
          type: 'stream' | 'listen' | 'blog' | 'gallery' | 'resources';
          category: string;
          content_type: 'video' | 'audio' | 'blog' | 'image' | 'file';
          price: number | null;
          rating: number;
          is_premium: boolean;
          views_count: number;
          plays_count: number;
          sales_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          title: string;
          creator_name: string;
          description?: string | null;
          thumbnail_url: string;
          duration?: string | null;
          read_time?: string | null;
          type?: 'stream' | 'listen' | 'blog' | 'gallery' | 'resources';
          category?: string;
          content_type?: 'video' | 'audio' | 'blog' | 'image' | 'file';
          price?: number | null;
          rating?: number;
          is_premium?: boolean;
        };
        Update: {
          title?: string;
          description?: string | null;
          thumbnail_url?: string;
          rating?: number;
          is_premium?: boolean;
        };
      };
      media_likes: {
        Row: {
          id: string;
          user_id: string;
          media_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          media_id: string;
        };
      };
      creator_follows: {
        Row: {
          id: string;
          follower_id: string;
          creator_name: string;
          created_at: string;
        };
        Insert: {
          follower_id: string;
          creator_name: string;
        };
      };
      tips: {
        Row: {
          id: string;
          from_user_id: string;
          creator_name: string;
          amount: number;
          currency: 'UGX' | 'USD' | 'EUR' | 'GBP';
          message: string | null;
          created_at: string;
        };
        Insert: {
          from_user_id: string;
          creator_name: string;
          amount: number;
          currency?: 'UGX' | 'USD' | 'EUR' | 'GBP';
          message?: string | null;
        };
      };
      media_items: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          type: string;
          category: string;
          thumbnail_url: string;
          creator: string;
          duration: string | null;
          read_time: string | null;
          views_count: number;
          like_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          title: string;
          description?: string | null;
          type: string;
          category?: string;
          thumbnail_url: string;
          creator: string;
          duration?: string | null;
          read_time?: string | null;
        };
        Update: {
          title?: string;
          description?: string | null;
          category?: string;
          thumbnail_url?: string;
        };
      };
    };
  };
};

export interface MediaItem {
  id: string;
  title: string;
  creator: string;
  thumbnail_url: string;
  duration?: string;
  read_time?: string;
  category: string;
  type: string;
  description: string | null;
  views_count: number;
  like_count: number;
  is_liked?: boolean;
  is_followed?: boolean;
  created_at: string;
  updated_at: string;
}
