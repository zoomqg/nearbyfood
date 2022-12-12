import { StyleSheet, Text, View, Dimensions, StatusBar, Image } from 'react-native'; 
import { useState, useEffect, createRef, ReactNode } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { gql, useQuery } from '@apollo/client';


import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import { Place } from '../types';
import ImageURLS from '../components/ImagesURLs';

const MARKERS_QUERY = gql`
  query Query {
    places {
      Latitude 
      Longitude
      Title
      Adress
      ID
      Category {
        Category
      }
    }
  }
`

type QueryReturns = {
  places: Place[]
}

export default function HomeScreen({ navigation } : any) {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const mapRef = createRef<MapView>(); 

  const onSearch = () =>{
    setIsSearchVisible(true);
  }
  
  const onSearchClose = () => {
    setIsSearchVisible(false);
  }

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })();
  }, []);
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const { data, loading, error } = useQuery<QueryReturns>(MARKERS_QUERY);

  if (loading) return <Loading />
  if (error) return <Loading />
  const places = data!.places 

  return (
    <SafeAreaView style={styles.container}>
      <MapView ref={mapRef} style={styles.map} 
          initialRegion={{
            latitude: 56.95153,
            longitude: 24.09986,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
      >
        {/* <Marker coordinate={{ latitude: places[0].Latitude, longitude: places[0].Longitude }}/> */}
        {places.map(place => (
          <Marker coordinate={ {latitude: place.Latitude, longitude: place.Longitude}} key={place.ID} >
            <Image source={ImageURLS[place.Category.Category as keyof typeof ImageURLS].with_shadow} style={{height: 35, width:35 }} />
          </Marker>
        ))}
      </MapView>
      <Button label="Search" onPress={onSearch}/>
      <SearchBar isVisible={isSearchVisible} onClose={onSearchClose} />
    </SafeAreaView>
  );
};


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
});