/**
 * PostCard Component - Displays individual post with modern styling
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface PostCardProps {
  id: number;
  title: string;
  body: string;
  index: number;
}

const PostCard: React.FC<PostCardProps> = ({ 
  id,
  title, 
  body, 
  index 
}: PostCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(0.9)).current;
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Enhanced staggered animation with rotation
    Animated.sequence([
      Animated.delay(index * 60),
      Animated.parallel([
        Animated.timing(slideAnimation, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnimation, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnimation, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [index, slideAnimation, fadeAnimation, scaleAnimation, rotateAnimation]);

  const translateY = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 0],
  });

  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['2deg', '0deg'],
  });

  const handlePress = () => {
    setExpanded(!expanded);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnimation,
          transform: [{ translateY }, { scale: scaleAnimation }, { rotate }],
        },
      ]}
    >
      <TouchableOpacity activeOpacity={0.7} style={styles.card} onPress={handlePress}>
        {/* Gradient accent bar */}
        <View style={styles.accentBar} />

        {/* Post Content */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>

          <Text style={styles.body} numberOfLines={expanded ? undefined : 3}>
            {body}
          </Text>

          {/* Read More indicator */}
          <View style={styles.footer}>
            <Text style={styles.readMore}>
              {expanded ? 'Show less ↑' : 'Read more →'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 16,
    width: '100%',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  accentBar: {
    height: 5,
    backgroundColor: '#DC2626',
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    lineHeight: 22,
  },
  body: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
    marginBottom: 12,
    fontWeight: '400',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  readMore: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: '600',
  },
});

export default PostCard;
