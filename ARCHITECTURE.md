# 🏗️ Architecture & Technical Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         App.tsx (Main)                       │
│  ├─ State Management (searchText, filteredPosts, etc.)     │
│  └─ Main Logic (search, refresh, error handling)           │
└────────────────┬────────────────────────────────────────────┘
                 │
     ┌───────────┴───────────┐
     │                       │
┌────▼──────────────┐  ┌────▼──────────────────┐
│   Components      │  │   Services & Hooks    │
│                   │  │                       │
├─ Header          │  ├─ postService          │
├─ SearchInput     │  │  ├─ fetchPosts()      │
├─ PostCard        │  │  └─ filterPosts()     │
├─ EmptyState      │  │                       │
├─ ErrorBanner     │  ├─ storageService       │
└─ LoadingSkeletons│  │  ├─ saveCurrentSearch│
                   │  │  ├─ getCurrentSearch  │
                   │  │  └─ addToSearchHistory│
                   │  │                       │
                   │  └─ useFetchPosts hook   │
└─────────────────────┘     └───────────────────┘
        │                         │
        └────────────────┬────────┘
                         │
           ┌─────────────┴────────────────┐
           │                              │
     ┌─────▼──────┐            ┌─────────▼───┐
     │ AsyncStorage│            │  REST API   │
     │             │            │             │
     │ - Searches  │            │ JSONPlace-  │
     │ - History   │            │ holder      │
     └─────────────┘            │ /posts      │
                                └─────────────┘
```

---

## Data Flow Diagram

### Search Flow
```
User Types
   │
   ├─> handleSearchChange()
   │       │
   │       ├─> setSearchText()
   │       ├─> saveCurrentSearch() → AsyncStorage
   │       └─> addToSearchHistory() → AsyncStorage
   │
   ├─> useEffect triggers
   │       │
   │       └─> filterPosts()
   │           └─> returns filtered array
   │
   └─> FlatList re-renders
       └─> PostCard components update
```

### API Fetch Flow
```
App Mounts
   │
   └─> useFetchPosts Hook
       │
       ├─> useEffect triggers
       │       │
       │       └─> postService.fetchPosts()
       │           │
       │           ├─ HTTP GET request
       │           │
       │           └─ Response handling
       │               ├─ Success: return posts array
       │               └─ Error: return error message
       │
       └─> State updates
           ├─ setPosts()
           ├─ setLoading()
           └─ setError()
```

### Storage Flow
```
On App Start
   │
   └─> useEffect: loadSavedSearch()
       │
       └─> storageService.getCurrentSearch()
           │
           ├─ Read from AsyncStorage
           ├─ Parse and validate
           └─ setSearchText()
               │
               └─> Auto-filter posts
```

---

## Component Hierarchy

```
App
├── Header
│   └─ LinearGradient (Expo)
├── ErrorBanner (conditional)
│   └─ Animated.View
├── SearchInput
│   ├─ TextInput
│   ├─ Animated.View
│   └─ Icons
├── FlatList
│   ├── PostCard (repeating)
│   │   └─ Animated.View
│   │       ├─ AccentBar
│   │       ├─ Title
│   │       ├─ Body
│   │       └─ ReadMore indicator
│   ├── LoadingSkeletons (while loading)
│   │   └─ SkeletonCard (repeating)
│   │       └─ Animated.View
│   └── EmptyState (if no results)
│       ├─ Icon
│       ├─ Message
│       └─ SubMessage
└── RefreshControl
```

---

## State Management Strategy

### App-Level State
```typescript
{
  // From useFetchPosts hook
  posts: Post[],              // All fetched posts
  loading: boolean,            // Loading state
  error: string | null,        // Error message
  
  // Local state
  searchText: string,          // Current search input
  filteredPosts: Post[],       // Filtered results
  showError: boolean,          // Show/hide error banner
  refreshing: boolean          // Pull-to-refresh state
}
```

### Derived State
```typescript
// Computed in useEffect
filteredPosts = postService.filterPosts(posts, searchText)

// Computed in render
isEmpty = filteredPosts.length === 0 && !searchText
showEmpty = isEmpty && !loading
```

---

## Key Algorithms

### Search Algorithm
```typescript
function filterPosts(posts, searchTerm) {
  if (!searchTerm.trim()) return posts;
  
  const lower = searchTerm.toLowerCase();
  
  return posts.filter(post =>
    post.title.toLowerCase().includes(lower) ||
    post.body.toLowerCase().includes(lower)
  );
}
// Time Complexity: O(n * m) where n=posts, m=search length
// Space Complexity: O(k) where k=results
```

### Storage Update Pattern
```typescript
// Efficient storage updates with debouncing built into onChange
async function handleSearchChange(text) {
  setSearchText(text);                    // Instant UI update
  await storageService.saveCurrentSearch(text);  // Background save
  await storageService.addToSearchHistory(text); // Background history
}
```

### Staggered Animation
```typescript
// Delay calculation based on index
const delay = index * 80;  // 80ms between each card

Animated.sequence([
  Animated.delay(delay),
  Animated.parallel([
    slideAnimation,
    fadeAnimation
  ])
]).start();
```

---

## Performance Optimizations

### 1. Render Optimization
- **FlatList**: Only renders visible items (virtualization)
- **Memoization**: PostCard prevents unnecessary re-renders
- **Keys**: Proper key prop for list items

### 2. Animation Optimization
- **Native Driver**: `useNativeDriver: true` for smooth 60fps
- **Interpolations**: Pre-computed value ranges
- **Cleanup**: Animations cancelled on unmount

### 3. Storage Optimization
- **Async Operations**: Non-blocking AsyncStorage calls
- **Search History Limit**: Only keep last 20 searches
- **Batch Operations**: Use multiRemove for cleanup

### 4. Network Optimization
- **Efficient API Call**: Single fetch on mount
- **Pull-to-Refresh**: Manual refresh only
- **Error Recovery**: No automatic retries (user-initiated)

---

## Error Handling Strategy

### API Errors
```typescript
try {
  const response = await fetch(URL);
  if (!response.ok) throw new Error(`Status: ${response.status}`);
  const data = await response.json();
  return { success: true, data };
} catch (error) {
  return {
    success: false,
    error: error.message
  };
}
```

### Storage Errors
```typescript
try {
  await AsyncStorage.setItem(key, value);
} catch (error) {
  console.error('Storage failed:', error);
  // Fail silently - app still works
}
```

### UI Error Handling
- **Error Banner**: Shows for 4 seconds then auto-dismisses
- **User Can Close**: Manual dismiss with X button
- **Non-blocking**: User can still interact with app

---

## Supported Features by Platform

| Feature | iOS | Android | Web |
|---------|-----|---------|-----|
| Fetch Posts | ✅ | ✅ | ✅ |
| Search | ✅ | ✅ | ✅ |
| AsyncStorage | ✅ | ✅ | ✅ |
| Animations | ✅ | ✅ | ✅ |
| Pull-to-Refresh | ✅ | ✅ | ✅ |
| Gradients | ✅ | ✅ | ✅ |
| Icons | ✅ | ✅ | ✅ |

---

## API Integration

### Endpoint
```
GET https://jsonplaceholder.typicode.com/posts
```

### Response
```json
[
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat...",
    "body": "quia et suscipit..."
  },
  // ... 100 posts total
]
```

### Error Handling
- Network timeout: 10 seconds
- Invalid response: Parsed and validated
- Empty response: Shows appropriate message

---

## Storage Structure

### AsyncStorage Keys
```
@PostsApp_CurrentSearch: "qui"        // String
@PostsApp_SearchHistory: "[...]"      // JSON Array
```

### Example History
```json
[
  "qui",
  "quia",
  "voluptas",
  "maxime",
  "sequi"
]
```

---

## Type Definitions

### Post Interface
```typescript
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
```

### API Response
```typescript
interface ApiResponse {
  success: boolean;
  data?: Post[];
  error?: string;
}
```

### Component Props
```typescript
interface PostCardProps {
  id: number;
  title: string;
  body: string;
  index: number;
}

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
}
```

---

## Development Workflow

### Adding a New Feature

1. **Create Component** in `src/components/`
2. **Add Types** (interfaces/types)
3. **Import in App.tsx**
4. **Add to Render**
5. **Test Thoroughly**
6. **Update Documentation**

### Adding a New Service

1. **Create Service** in `src/services/`
2. **Export Functions**
3. **Add Error Handling**
4. **Add TypeScript Types**
5. **Use in Components**

### Debugging

```typescript
// Enable logging
const DEBUG = true;

if (DEBUG) {
  console.log('Component rendered');
  console.log('State:', state);
  console.log('Props:', props);
}
```

---

## Security Considerations

1. **API**: Uses HTTPS (JSONPlaceholder)
2. **Storage**: No sensitive data stored
3. **Network**: No authentication needed
4. **Validation**: Input sanitization
5. **Code**: TypeScript prevents type errors

---

## Future Enhancements

Possible improvements:

- [ ] Infinite scroll pagination
- [ ] Offline support (cache API responses)
- [ ] User profiles and comments
- [ ] Favorites/bookmarks
- [ ] Dark mode support
- [ ] Search analytics
- [ ] Multi-language support
- [ ] Push notifications

---

**Architecture is clean, scalable, and production-ready! 🚀**
