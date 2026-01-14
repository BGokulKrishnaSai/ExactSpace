/**
 * Main App Component - Posts App with Search & AsyncStorage
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  Dimensions,
} from 'react-native';

// Components
import Header from './src/components/Header';
import SearchInput from './src/components/SearchInput';
import PostCard from './src/components/PostCard';
import EmptyState from './src/components/EmptyState';
import LoadingSkeletons from './src/components/LoadingSkeletons';
import ErrorBanner from './src/components/ErrorBanner';

// Services & Hooks
import { useFetchPosts } from './src/hooks/useFetchPosts';
import { postService } from './src/services/postService';
import { storageService } from './src/services/storageService';

const { height } = Dimensions.get('window');

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function App() {
  const { posts, loading, error, refetch } = useFetchPosts();
  const [searchText, setSearchText] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [showError, setShowError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Load saved search on app start
  useEffect(() => {
    const loadSavedSearch = async () => {
      const savedSearch = await storageService.getCurrentSearch();
      if (savedSearch) {
        setSearchText(savedSearch);
      }
    };

    loadSavedSearch();
  }, []);

  // Filter posts when search text or posts change
  useEffect(() => {
    const filtered = postService.filterPosts(posts, searchText);
    setFilteredPosts(filtered);
  }, [posts, searchText]);

  // Handle search input change
  const handleSearchChange = useCallback(async (text: string) => {
    setSearchText(text);
    await storageService.saveCurrentSearch(text);

    if (text.trim()) {
      await storageService.addToSearchHistory(text);
    }
  }, []);

  // Handle clear search
  const handleClearSearch = useCallback(async () => {
    setSearchText('');
    await storageService.saveCurrentSearch('');
  }, []);

  // Handle pull to refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  // Show/hide error banner
  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  // Handle render empty
  const renderEmpty = () => {
    if (loading) {
      return <LoadingSkeletons count={5} />;
    }

    if (searchText && filteredPosts.length === 0) {
      return (
        <EmptyState
          message="No posts found"
          subMessage={`No results for "${searchText}". Try a different search term.`}
          icon="magnify"
        />
      );
    }

    if (filteredPosts.length === 0) {
      return (
        <EmptyState
          message="No posts available"
          subMessage="Unable to load posts. Please check your connection and try again."
          icon="wifi-off"
        />
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <Header
          title="PostsHub"
          subtitle="Discover & Search Amazing Stories"
        />

        {/* Error Banner */}
        {showError && error && (
          <ErrorBanner
            message={error}
            onDismiss={() => setShowError(false)}
            autoHide={true}
            autoHideDuration={4000}
          />
        )}

        {/* Search Input */}
        {!loading && <SearchInput
          value={searchText}
          onChangeText={handleSearchChange}
          onClear={handleClearSearch}
          placeholder="Search by title or content..."
        />}

        {/* Posts List */}
        {!loading ? (
          <FlatList
            data={filteredPosts}
            renderItem={({ item, index }: { item: Post; index: number }) => (
              <PostCard
                id={item.id}
                title={item.title}
                body={item.body}
                index={index}
              />
            )}
            keyExtractor={(item: Post) => item.id.toString()}
            ListEmptyComponent={renderEmpty}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={['#FF6B9D']}
                tintColor="#FF6B9D"
              />
            }
            scrollEventThrottle={16}
          />
        ) : (
          <LoadingSkeletons count={5} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  listContent: {
    paddingVertical: 8,
    flexGrow: 1,
  },
});
