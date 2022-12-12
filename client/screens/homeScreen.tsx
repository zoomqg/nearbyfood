import { StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native'; 
import { useState, useEffect, createRef } from 'react';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

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
      />
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