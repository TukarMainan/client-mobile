import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function NearbyCard({ item }){
  return (
    <View style={styles.container}>
      <Image source={{ uri: item?.images[0] }} style={styles.image} />
      <Text style={styles.name}>{item?.name}</Text>
      <Text style={styles.category}>{item?.category}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderTopLeftRadius:20,
    borderTopRightRadius:20
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor:'#e39ff6',
    width:150,
    textAlign:'center'
  },
  category: {
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor:'#e39ff6',
    width:150,
    textAlign:'center',
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20

  },
});

