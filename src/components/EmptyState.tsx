/**
 * EmptyState Component - Shows when no posts found
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface EmptyStateProps {
  message: string;
  subMessage?: string;
  icon?: any;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  subMessage,
  icon = 'magnify',
}: EmptyStateProps) => {
  const scaleAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnimation, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnimation,
          transform: [{ scale: scaleAnimation }],
        },
      ]}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={icon} size={64} color="#DC2626" />
      </View>

      <Text style={styles.message}>{message}</Text>
      {subMessage && <Text style={styles.subMessage}>{subMessage}</Text>}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    marginBottom: 24,
    opacity: 0.8,
  },
  message: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 8,
  },
  subMessage: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 20,
  },
});

export default EmptyState;
