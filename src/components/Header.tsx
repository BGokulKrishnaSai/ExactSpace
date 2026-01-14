/**
 * Header Component - App header with gradient
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({
  title = 'PostsHub',
  subtitle = 'Discover amazing stories',
}: HeaderProps) => {
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(slideAnimation, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const translateY = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-40, 0],
  });

  return (
    <LinearGradient
      colors={['#DC2626', '#991B1B', '#1A1A1A']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView>
        <Animated.View
          style={[
            styles.content,
            {
              transform: [{ translateY }, { scale: scaleAnimation }],
            },
          ]}
        >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    paddingVertical: 20,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    fontWeight: '500',
  },
});

export default Header;
