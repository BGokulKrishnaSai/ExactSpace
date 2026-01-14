/**
 * AsyncStorage Service for managing search history
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const SEARCH_HISTORY_KEY = '@PostsApp_SearchHistory';
const CURRENT_SEARCH_KEY = '@PostsApp_CurrentSearch';

export const storageService = {
  /**
   * Save current search text to AsyncStorage
   */
  async saveCurrentSearch(searchText: string): Promise<void> {
    try {
      await AsyncStorage.setItem(CURRENT_SEARCH_KEY, searchText);
    } catch (error) {
      console.error('Failed to save search:', error);
    }
  },

  /**
   * Retrieve the last saved search text
   */
  async getCurrentSearch(): Promise<string> {
    try {
      const search = await AsyncStorage.getItem(CURRENT_SEARCH_KEY);
      return search || '';
    } catch (error) {
      console.error('Failed to retrieve search:', error);
      return '';
    }
  },

  /**
   * Add search to history
   */
  async addToSearchHistory(searchText: string): Promise<void> {
    try {
      if (!searchText.trim()) return;

      const history = await this.getSearchHistory();
      const filtered = history.filter((item) => item !== searchText);
      const newHistory = [searchText, ...filtered].slice(0, 20); // Keep last 20 searches

      await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Failed to add to history:', error);
    }
  },

  /**
   * Get search history
   */
  async getSearchHistory(): Promise<string[]> {
    try {
      const history = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Failed to retrieve history:', error);
      return [];
    }
  },

  /**
   * Clear search history
   */
  async clearSearchHistory(): Promise<void> {
    try {
      await AsyncStorage.removeItem(SEARCH_HISTORY_KEY);
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  },

  /**
   * Clear all saved data
   */
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([SEARCH_HISTORY_KEY, CURRENT_SEARCH_KEY]);
    } catch (error) {
      console.error('Failed to clear all data:', error);
    }
  },
};
