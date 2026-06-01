import { StackScreenProps } from "@react-navigation/stack";
import React, {
  startTransition,
  useContext,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AppStackParamList } from "../../navigation/typeNavigation";
import { homeStyles } from "../../styles/appStyle";
import { Card } from "../../components/ui/Card";
import { Character } from "../../types/api";
import { getCharacters } from "../../services/characters";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { Button } from "../../components/ui/Button";
import { AuthContext } from "../../context/AuthContext";

type HomeScreenNavigationProp = StackScreenProps<AppStackParamList, "Home">;

export const HomeScreen = ({ navigation }: HomeScreenNavigationProp) => {
  const { user, signOut } = useContext(AuthContext);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getCharacters();
      setCharacters(data);
    } catch {
      setError("No se pudo cargar la lista");
    } finally {
      setLoading(false);
    }
  };

  const filteredCharacters = characters.filter((item) =>
    item.name.toLowerCase().includes(deferredSearch.trim().toLowerCase())
  );

  const handleLogout = async () => {
    await signOut();
  };

  if (loading) {
    return <LoadingSpinner message="Cargando personajes" />;
  }

  if (error) {
    return (
      <View style={homeStyles.errorContainer}>
        <Text style={homeStyles.errorEmoji}>:(</Text>
        <Text style={homeStyles.errorText}>{error}</Text>
        <Button title="Reintentar" onPress={loadCharacters} style={homeStyles.retryButton} />
      </View>
    );
  }

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.header}>
        <View>
          <Text style={homeStyles.greeting}>¡Hola!</Text>
          <Text style={homeStyles.email} numberOfLines={1}>
            {user?.email ?? ""}
          </Text>
        </View>
        <TouchableOpacity style={homeStyles.logoutBtn} onPress={handleLogout}>
          <Text style={homeStyles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>

      <Text style={homeStyles.sectionTitle}>Personajes</Text>

      <View style={homeStyles.searchWrapper}>
        <TextInput
          style={homeStyles.searchInput}
          placeholder="Buscar por nombre"
          placeholderTextColor="#A0AEC0"
          value={search}
          onChangeText={(value) => {
            startTransition(() => setSearch(value));
          }}
        />
      </View>

      <FlatList
        data={filteredCharacters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            character={item}
            onPress={() =>
              navigation.navigate("Detail", {
                characterId: item.id,
                name: item.name,
              })
            }
          />
        )}
        ListEmptyComponent={
          <View style={homeStyles.emptyContainer}>
            <Text style={homeStyles.emptyText}>No hay resultados</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={homeStyles.list}
      />
    </View>
  );
};
