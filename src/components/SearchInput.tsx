/**
 * SearchInput Component - Search bar with animations
 */

import React, { useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search posts...',
}: SearchInputProps) => {
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const clearIconScale = useRef(new Animated.Value(0)).current;
  const borderColorAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (value.length > 0) {
      Animated.spring(clearIconScale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    } else {
      Animated.timing(clearIconScale, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [value]);

  const handleFocus = () => {
    Animated.parallel([
      Animated.spring(scaleAnimation, {
        toValue: 1.04,
        useNativeDriver: false,
        tension: 50,
        friction: 7,
      }),
      Animated.timing(borderColorAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleBlur = () => {
    Animated.parallel([
      Animated.spring(scaleAnimation, {
        toValue: 1,
        useNativeDriver: false,
        tension: 50,
        friction: 7,
      }),
      Animated.timing(borderColorAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const borderColor = borderColorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#F0F0F0', '#DC2626'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnimation }],
        },
      ]}
    >
      <Animated.View style={[styles.inputWrapper, { borderColor }]}>
        <MaterialCommunityIcons
          name="magnify"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#CCC"
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          clearButtonMode="never"
          returnKeyType="search"
        />

        {value.length > 0 && (
          <Animated.View
            style={[
              styles.clearIconContainer,
              {
                opacity: clearIconScale,
                transform: [{ scale: clearIconScale }],
              },
            ]}
          >
            <TouchableOpacity onPress={onClear} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <MaterialCommunityIcons
                name="close-circle"
                size={20}
                color="#DC2626"
              />
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#F9F9F9',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  clearIconContainer: {
    marginLeft: 8,
  },
});

export default SearchInput;
