import React from "react";
import { StyleSheet, Text, View } from 'react-native';

export default function PlaceScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Place Screen is not made yet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
  },
});
