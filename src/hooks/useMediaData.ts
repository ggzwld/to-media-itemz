import { useState, useEffect } from 'react';
import { supabase, MediaItem } from '../lib/supabase';

export function useMediaData(type: string, userId: string | null) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMediaItems();

    const likesChannel = supabase
      .channel(`media-likes-changes-${type}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'likes'
        },
        () => {
          fetchMediaItems();
        }
      )
      .subscribe();

    const followsChannel = supabase
      .channel(`creator-follows-changes-${type}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'creator_follows'
        },
        () => {
          fetchMediaItems();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(likesChannel);
      supabase.removeChannel(followsChannel);
    };
  }, [type, userId]);

  async function fetchMediaItems() {
    try {
      setLoading(true);
      setError(null);

      const { data: items, error: itemsError } = await supabase
        .from('media_items')
        .select('*')
        .eq('type', type)
        .order('created_at', { ascending: false });

      if (itemsError) throw itemsError;

      if (!items || items.length === 0) {
        setMediaItems([]);
        return;
      }

      const { data: likesData } = await supabase
        .from('likes')
        .select('media_id, user_id');

      const { data: followsData } = await supabase
        .from('creator_follows')
        .select('creator_name, follower_id');

      const likeCounts: Record<string, number> = {};
      const userLikes = new Set<string>();

      if (likesData) {
        likesData.forEach((like) => {
          likeCounts[like.media_id] = (likeCounts[like.media_id] || 0) + 1;
          if (userId && like.user_id === userId) {
            userLikes.add(like.media_id);
          }
        });
      }

      const userFollows = new Set<string>();
      if (followsData && userId) {
        followsData.forEach((follow) => {
          if (follow.follower_id === userId) {
            userFollows.add(follow.creator_name);
          }
        });
      }

      const enrichedItems: MediaItem[] = items.map((item) => ({
        ...item,
        like_count: likeCounts[item.id] || item.like_count || 0,
        is_liked: userLikes.has(item.id),
        is_followed: userFollows.has(item.creator)
      }));

      setMediaItems(enrichedItems);
    } catch (err) {
      console.error('Error fetching media items:', err);
      setError('Failed to load media items');
      setMediaItems([]);
    } finally {
      setLoading(false);
    }
  }

  return { mediaItems, loading, error, refetch: fetchMediaItems };
}
