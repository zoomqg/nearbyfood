import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import Edit from '../components/EditingFeedback';
import Info from '../components/PlaceInfo';
import ImageURLS from "../components/ImagesURLs";
import { Place } from "../types";
import { GET_FEEDBACK_FOR_PLACE } from "../gql";
import { useMutation, useQuery } from '@apollo/client';
import Loading from "../components/Loading";
import { FeedBack } from "../types";


type QueryReturns = {
  feedback_for_place: FeedBack[];
};

type RouteReturns = {
  place: Place;
  user_id: number;
}

export default function PlaceScreen({ route, navigation }: any) {
  const { place, user_id }: RouteReturns = route.params;
  const { loading: queryLoading, error: queryError, data, refetch } = useQuery<QueryReturns>(GET_FEEDBACK_FOR_PLACE, {
    variables: {
      placeId: place.ID
    }
  });
  const handleRefetch = () => {
    refetch();
  };
  if (queryLoading || queryError) {
    return <Loading />;
  }
  const feedback_arr = data!.feedback_for_place;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={ImageURLS.without_shadow[place.Category!.Category as keyof typeof ImageURLS.without_shadow]} style={styles.imgBorder} />
      </View>
      <Swiper loop={false}>
        <Info place={place} user_id={user_id} feedback_arr={feedback_arr} />
        <Edit user_id={user_id} label={"Leave feedback"} place_id={parseInt(place.ID)} onSuccess={handleRefetch} />
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
