import { StyleSheet, Text, View, Dimensions } from 'react-native'; 
import { useState, useEffect, createRef } from 'react';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import Button from './components/Button';

const onSearch = () =>{
  console.log('negr');
}
const calculateRightHeightForLocationButton = () =>{
  const screen_height = Dimensions.get('screen').height;
  return screen_height / 16;
}

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const mapRef = createRef<MapView>(); 
  

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
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} 
          initialRegion={{
            latitude: 56.95153,
            longitude: 24.09986,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          mapPadding={{top: calculateRightHeightForLocationButton(), bottom: 0, right: 0, left: 0}}
      />
      <Button label="Search" onPress={onSearch}/>
    </View>
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
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
});