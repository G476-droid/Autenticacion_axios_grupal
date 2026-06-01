import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { cardStyles } from '../../styles/appStyle';

interface CardProps {
  onPress: () => void;
}

export const Card = ({ onPress }: CardProps) => {
  return (
    <TouchableOpacity style={cardStyles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={cardStyles.header}>
        <View style={cardStyles.badge}>
          <Text style={cardStyles.badgeText}>#</Text>
        </View>
        <Text style={cardStyles.userId}>Usuario</Text>
      </View>
      <Text style={cardStyles.title} numberOfLines={2}></Text>
      <Text style={cardStyles.body} numberOfLines={3}></Text>
    </TouchableOpacity>
  );
};


