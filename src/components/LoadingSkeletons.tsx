/**
 * LoadingSkeletons Component - Skeleton loaders for initial load
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  FlatList,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const SkeletonCard: React.FC = () => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmerAnimation]);

  const opacity = shimmerAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.8, 0.3],
  });

  return (
    <Animated.View style={[styles.card, { opacity }]}>
      <View style={styles.accentBar} />
      <View style={styles.content}>
        <View style={styles.titleSkeleton} />
        <View style={styles.lineSkeleton} />
        <View style={[styles.lineSkeleton, { width: '60%', marginTop: 8 }]} />
      </View>
    </Animated.View>
  );
};

interface LoadingSkeletonsProps {
  count?: number;
}

const LoadingSkeletons: React.FC<LoadingSkeletonsProps> = ({ count = 5 }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={Array.from({ length: count }, (_, i) => i)}
        renderItem={() => <SkeletonCard />}
        keyExtractor={(item: number) => item.toString()}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#E0E0E0',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  accentBar: {
    height: 4,
    backgroundColor: '#D0D0D0',
  },
  content: {
    padding: 16,
  },
  titleSkeleton: {
    height: 18,
    backgroundColor: '#D0D0D0',
    borderRadius: 4,
    marginBottom: 10,
  },
  lineSkeleton: {
    height: 12,
    backgroundColor: '#D0D0D0',
    borderRadius: 4,
    marginBottom: 6,
  },
});

export default LoadingSkeletons;
