import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { cardStyles } from "../../styles/appStyle";
import { Character } from "../../types/api";
import { RemoteImage } from "./RemoteImage";

interface CardProps {
  character: Character;
  onPress: () => void;
}

export const Card = ({ character, onPress }: CardProps) => {
  return (
    <TouchableOpacity style={cardStyles.card} onPress={onPress} activeOpacity={0.7}>
      <RemoteImage uri={character.image} style={cardStyles.image} />
      <View style={cardStyles.header}>
        <View style={cardStyles.badge}>
          <Text style={cardStyles.badgeText}>#{character.id}</Text>
        </View>
        <Text style={cardStyles.userId}>{character.status}</Text>
      </View>
      <Text style={cardStyles.title} numberOfLines={2}>
        {character.name}
      </Text>
      <Text style={cardStyles.body} numberOfLines={3}>
        {character.species} · {character.gender} · {character.location.name}
      </Text>
    </TouchableOpacity>
  );
};
