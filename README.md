# PostsHub - React Native Assessment App

A professional React Native application that fetches posts from an API, provides real-time search functionality, and persists user search history using AsyncStorage. Features a modern, Gen Z-inspired UI with smooth animations and gradients.

## 🚀 Features

### Core Features (Mandatory)
- ✅ **Fetch & Display Posts** - Fetches posts from JSONPlaceholder API
- ✅ **Search Functionality** - Real-time filtering by title and body
- ✅ **Search Persistence** - Saves search text using AsyncStorage
- ✅ **Error Handling** - Network errors and empty states with user feedback
- ✅ **Pull-to-Refresh** - Reload posts with pull gesture

### Bonus Features
- ✨ **Skeleton Loading** - Shimmer animation while fetching posts
- ✨ **Smooth Animations** - Staggered card animations on load
- ✨ **Modern UI** - Gradient header, glass-morphism effects
- ✨ **Error Banners** - Auto-dismissing error notifications
- ✨ **Custom Hooks** - Reusable fetch logic
- ✨ **Clean Architecture** - Separated concerns (services, hooks, components)

## 📦 Project Structure

```
react-native-task-assessment/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── PostCard.tsx      # Individual post display with animations
│   │   ├── SearchInput.tsx   # Search bar with animations
│   │   ├── Header.tsx        # Gradient header
│   │   ├── EmptyState.tsx    # Empty/error states
│   │   ├── ErrorBanner.tsx   # Error notification banner
│   │   └── LoadingSkeletons.tsx # Skeleton loaders
│   ├── services/            # Business logic & API calls
│   │   ├── postService.ts    # API fetching & filtering
│   │   └── storageService.ts # AsyncStorage management
│   ├── hooks/               # Custom React hooks
│   │   └── useFetchPosts.ts  # Fetch posts hook
│   └── utils/               # Utility functions
├── App.tsx                  # Main app component
├── index.js                 # Entry point
├── app.json                 # Expo configuration
├── package.json             # Dependencies & scripts
├── babel.config.js          # Babel configuration
└── README.md                # This file
```

## 🛠️ Tech Stack

- **React Native** 0.73.0
- **Expo** 50.0.0
- **TypeScript** - Type-safe development
- **AsyncStorage** - Local data persistence
- **Expo Linear Gradient** - Gradient backgrounds
- **Expo Vector Icons** - Material Community Icons

## 📋 Requirements Met

### 1. Fetch & Display Posts
- ✅ GET request to `https://jsonplaceholder.typicode.com/posts`
- ✅ Display title and body using FlatList
- ✅ Clean, professional UI

### 2. Search Functionality
- ✅ Search input at top
- ✅ Case-insensitive filtering
- ✅ Instant filtering as user types
- ✅ Searches both title and body

### 3. Save Search Using AsyncStorage
- ✅ Saves search text on each keystroke
- ✅ Retrieves saved search on app restart
- ✅ Auto-fills search box
- ✅ Applies filtering automatically

### 4. Error Handling
- ✅ Network error messages
- ✅ Empty results state with helpful messages
- ✅ User-friendly error notifications
- ✅ Auto-dismissing error banners

## 🎨 UI/UX Features

- **Color Scheme**: Modern gradient (Pink #FF6B9D, Light Pink #FFB3D9)
- **Typography**: Clean, modern fonts with proper hierarchy
- **Animations**: 
  - Staggered card entrance animations
  - Smooth search input transitions
  - Shimmer skeleton loading
  - Spring-based interactions
- **Responsive**: Works on all screen sizes
- **Accessibility**: Proper touch targets and color contrast

## 🚀 Getting Started
<img width="1288" height="793" alt="image" src="https://github.com/user-attachments/assets/67cd7cb5-c4bc-4cb4-bd01-ba33dd71d715" />

### Prerequisites
- Node.js 16+
- npm or yarn
- Expo CLI (optional, but recommended)

### Installation

1. **Clone or extract the project**
```bash
cd react-native-task-assessment
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start the development server**
```bash
npm start
# or
yarn start
```

4. **Run on device/emulator**
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web browser
- Scan QR code with Expo Go app on physical device

## 📱 Running on Different Platforms

### iOS
```bash
npm run ios
# or
yarn ios
```

### Android
```bash
npm run android
# or
yarn android
```

### Web
```bash
npm run web
# or
yarn web
```

## 🧪 Testing

### Test Search Functionality
1. Type in search box
2. See posts filter in real-time
3. Close app and reopen - search should persist
4. Pull to refresh to reload posts

### Test Error Handling
1. Disconnect network and restart app
2. Error banner should appear with helpful message
3. Reconnect and try pull-to-refresh
4. Posts should load successfully

### Test Animations
1. Open app to see staggered card animations
2. Type in search to see input scale animation
3. Clear search to see icon animations
4. Refresh to see loading skeleton animation

## 📚 Component Documentation

### PostCard
Displays individual post with animations and styling.
```typescript
<PostCard id={1} title="Post Title" body="Post content..." index={0} />
```

### SearchInput
Animated search bar with clear button.
```typescript
<SearchInput 
  value={searchText} 
  onChangeText={setSearchText}
  onClear={handleClear}
  placeholder="Search posts..."
/>
```

### EmptyState
Shows when no posts found or network error.
```typescript
<EmptyState 
  message="No posts found"
  subMessage="Try a different search"
  icon="magnify"
/>
```

### Header
Gradient header with title and subtitle.
```typescript
<Header title="PostsHub" subtitle="Discover stories" />
```

## 🔧 Services

### postService
- `fetchPosts()` - Fetches posts from API
- `filterPosts(posts, searchTerm)` - Filters posts by search term

### storageService
- `saveCurrentSearch(text)` - Save current search
- `getCurrentSearch()` - Get saved search
- `addToSearchHistory(text)` - Add to search history
- `getSearchHistory()` - Get search history list
- `clearSearchHistory()` - Clear all history

## 📦 Dependencies

### Main
- `react-native` - Framework
- `expo` - Development platform
- `@react-native-async-storage/async-storage` - Storage
- `expo-linear-gradient` - Gradients

### Dev
- `typescript` - Type checking
- `babel` - JavaScript transpiler
- `jest` - Testing framework

## 🎯 Performance Considerations

- Skeleton loaders prevent layout shift
- Memoized components reduce re-renders
- FlatList with optimized rendering
- Debounced search updates
- Lazy loading with AsyncStorage

## 🐛 Known Issues

None currently!

## 🔒 Security & Best Practices

- API calls with error handling
- No sensitive data stored locally
- Safe AsyncStorage operations
- Type-safe TypeScript code
- Proper component separation

## 📝 Notes

- **React Native Version**: 0.73.0
- **Expo Version**: 50.0.0
- **APIs Used**: JSONPlaceholder (free mock API)
- **Storage**: AsyncStorage (built-in React Native)
- **Animations**: React Native Animated API
- **Icons**: Expo Vector Icons (Material Community)

## 🚀 Build for Production

### iOS
```bash
eas build --platform ios
```

### Android
```bash
eas build --platform android
```

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created as a React Native assessment project By B Gokul Krishna Sai - 2026
