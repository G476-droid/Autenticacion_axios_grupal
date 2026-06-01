import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { AppStackParamList } from '../../../navigation/typeNavigation';
import { homeStyles } from '../../styles/appStyle';
import { Card } from '../../components/ui/Card';


type HomeScreenNavigationProp = StackScreenProps<AppStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: HomeScreenNavigationProp) => {


  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.header}>
        <View>
          <Text style={homeStyles.greeting}>¡Hola!</Text>
          <Text style={homeStyles.email} numberOfLines={1}></Text>
        </View>
        <TouchableOpacity style={homeStyles.logoutBtn} onPress={()=>{}}>
          <Text style={homeStyles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>

      <Text style={homeStyles.sectionTitle}>Posts </Text>

      <FlatList
        data={[]}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Card
            onPress={() => navigation.navigate('Detail', { postId: 1, title: ""})}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={homeStyles.list}
      />
    </View>
  );
};



