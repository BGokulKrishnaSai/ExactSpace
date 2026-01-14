/**
 * ErrorBanner Component - Shows error messages with animations
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ErrorBannerProps {
  message: string;
  onDismiss?: () => void;
  autoHide?: boolean;
  autoHideDuration?: number;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({
  message,
  onDismiss,
  autoHide = true,
  autoHideDuration = 5000,
}: ErrorBannerProps) => {
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const opacityAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(slideAnimation, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();

    if (autoHide) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss?.();
    });
  };

  const translateY = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacityAnimation,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.banner}>
        <MaterialCommunityIcons
          name="alert-circle"
          size={20}
          color="#FFFFFF"
          style={styles.icon}
        />
        <Text style={styles.message} numberOfLines={2}>
          {message}
        </Text>
        <TouchableOpacity onPress={handleDismiss} hitSlop={{ top: 8, bottom: 8, right: 8 }}>
          <MaterialCommunityIcons
            name="close"
            size={20}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC2626',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 6,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  icon: {
    marginRight: 12,
  },
  message: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default ErrorBanner;
