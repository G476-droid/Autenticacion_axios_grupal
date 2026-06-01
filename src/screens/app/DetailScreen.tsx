import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../../navigation/typeNavigation";
import { detailStyles } from "../../styles/appStyle";
import { Character } from "../../types/api";
import { getCharacterById } from "../../services/characters";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { Button } from "../../components/ui/Button";
import { RemoteImage } from "../../components/ui/RemoteImage";

type DetailScreenNavigationProp = StackScreenProps<AppStackParamList, "Detail">;

export const DetailScreen = ({ route }: DetailScreenNavigationProp) => {
  const { characterId } = route.params;
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCharacter();
  }, [characterId]);

  const loadCharacter = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getCharacterById(characterId);
      setCharacter(data);
    } catch {
      setError("No se pudo cargar el detalle");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Cargando detalle" />;
  }

  if (error || !character) {
    return (
      <View style={detailStyles.errorContainer}>
        <Text style={detailStyles.errorEmoji}>:(</Text>
        <Text style={detailStyles.errorText}>{error || "Sin información"}</Text>
        <Button title="Reintentar" onPress={loadCharacter} style={detailStyles.retryButton} />
      </View>
    );
  }

  return (
    <ScrollView
      style={detailStyles.container}
      contentContainerStyle={detailStyles.content}
    >
      <RemoteImage uri={character.image} style={detailStyles.image} />

      <View style={detailStyles.meta}>
        <View style={detailStyles.badge}>
          <Text style={detailStyles.badgeText}>#{character.id}</Text>
        </View>
        <Text style={detailStyles.userId}>{character.status}</Text>
      </View>

      <Text style={detailStyles.title}>{character.name}</Text>

      <View style={detailStyles.divider} />

      <View style={detailStyles.infoCard}>
        <View style={detailStyles.infoRow}>
          <Text style={detailStyles.infoLabel}>Especie</Text>
          <Text style={detailStyles.infoValue}>{character.species}</Text>
        </View>
        <View style={detailStyles.infoRow}>
          <Text style={detailStyles.infoLabel}>Género</Text>
          <Text style={detailStyles.infoValue}>{character.gender}</Text>
        </View>
        <View style={detailStyles.infoRow}>
          <Text style={detailStyles.infoLabel}>Origen</Text>
          <Text style={detailStyles.infoValue}>{character.origin.name}</Text>
        </View>
        <View style={detailStyles.infoRow}>
          <Text style={detailStyles.infoLabel}>Ubicación</Text>
          <Text style={detailStyles.infoValue}>{character.location.name}</Text>
        </View>
        <View style={detailStyles.infoRow}>
          <Text style={detailStyles.infoLabel}>Tipo</Text>
          <Text style={detailStyles.infoValue}>
            {character.type || "Sin tipo"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
