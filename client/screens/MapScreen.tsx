import React, { useState, useEffect, createRef } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { gql, useQuery } from '@apollo/client';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import MarkersChoise from '../components/MarkersChoise';
import AdminButton from '../components/Admin_Button';
import SearchButton from '../components/Search_Button';
import AddButton from '../components/Add_Button';
import { Place, Place_Submission, User } from '../types';
import { QUERY } from '../gql';

type QueryReturns = {
  places: Place[];
  user_by_number: User;
  place_submissions: Place_Submission[];
};

export default function MapScreen({ route, navigation }: any) {
  const { phoneNumber } = route.params;
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const mapRef = createRef<MapView>();

  const [mapDisplays, setMapDisplays] = useState('all');

  const loadModerationPage = () => {
    navigation.navigate('PlaceSubmissionsModeration', {
      place_submissions: place_submissions
    });
  };

  const moveToPlaceSubmissionScreen = () =>{
    navigation.navigate('PlaceSubmissionsScreen', {
      user_id: user_obj.ID
    });
  }

  const moveToSearchScreen = () =>{
    navigation.navigate('SearchScreen');
  }

  const onSearch = () => {
    setIsSearchVisible(true);
  };

  const onSearchClose = () => {
    setIsSearchVisible(false);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      navigation.addListener('beforeRemove', (e: any) => {
        e.preventDefault();
      });
    })();
  }, []);

  const { data, loading, error } = useQuery<QueryReturns>(QUERY, {
    variables: {
      number: phoneNumber
    }
  });

  if (loading || error) return <Loading />;
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  const places = data!.places;
  const place_submissions = data!.place_submissions;
  const user_obj = data!.user_by_number

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 56.95153,
            longitude: 24.09986,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          mapPadding={{ bottom: 60, top: 0, right: 0, left: 0 }}
        >
          <MarkersChoise styles={styles} placeArr={places} mapDisplays={mapDisplays} />
        </MapView>
        <SearchButton onPress={moveToSearchScreen} />
        <AddButton onPress={moveToPlaceSubmissionScreen} />
        {data?.user_by_number.Role === 'ADMIN' && <AdminButton onPress={loadModerationPage} />}
        <Button label="Filter" onPress={onSearch} />
        <SearchBar isVisible={isSearchVisible} onClose={onSearchClose} setMapDisplays={setMapDisplays} moveToPlaceSubmissionScreen={moveToPlaceSubmissionScreen}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  icons_on_map: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
    height: 28,
    width: 28,
  },
});
