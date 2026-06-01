import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AppStackParamList } from '../../../navigation/typeNavigation';
import { detailStyles } from '../../styles/appStyle';

type DetailScreenNavigationProp = StackScreenProps<AppStackParamList, 'Detail'>;


export const DetailScreen = ({ navigation, route }: DetailScreenNavigationProp) => {
  const { postId } = route.params;

  return (
    <ScrollView style={detailStyles.container} contentContainerStyle={detailStyles.content}>
      <View style={detailStyles.meta}>
        <View style={detailStyles.badge}>
          <Text style={detailStyles.badgeText}>Post #</Text>
        </View>
        <Text style={detailStyles.userId}>Autor: User </Text>
      </View>

      <Text style={detailStyles.title}></Text>

      <View style={detailStyles.divider} />

      <Text style={detailStyles.bodyLabel}>Contenido</Text>
      <Text style={detailStyles.body}></Text>
    </ScrollView>
  );
};



