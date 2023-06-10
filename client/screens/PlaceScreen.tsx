import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import Edit from '../components/Edit';
import Info from '../components/Info';
import ImageURLS from "../components/ImagesURLs";
import { Place } from "../types";

type RouteReturns = {
  place: Place
}

export default function PlaceScreen({ route, navigation }: any) {
  const { place }: RouteReturns = route.params;
  console.log(place)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={ImageURLS.without_shadow[place.Category!.Category as keyof typeof ImageURLS.without_shadow]} style={styles.imgBorder} />
      </View>
      <Swiper loop={false}>
        <Info />
        <Edit />
      </Swiper>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  imgContainer: {
    alignItems: 'center',
    marginTop: 80
  },
  imgBorder: {
    backgroundColor: '#D9D9D9',
    height: 100,
    width: 100,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
