import { StyleSheet, Text, View, Dimensions, StatusBar, Image } from 'react-native'; 
import { useState, useEffect, createRef, ReactNode } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { gql, useQuery } from '@apollo/client';

import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import { Place, Place_Submission, User } from '../types';
import MarkersChoise from '../components/MarkersChoise';
import AdminButton from '../components/Admin_Button';

const MARKERS_QUERY = gql`
query Query($number: String!) {
  places {
    ID
    Title
    Adress
    Category {
      ID
      Category
    }
    Category_ID
    Latitude
    Longitude
    Added_Timestamp
    Requested_Timestamp
    Opened
    Submission_User_ID
    User {
      Phone
    }
  }
  user_by_number(number: $number) {
    ID
    Surname
    Phone
    Role
    Name
  }
  place_submissions {
    ID
    Title
    Adress
    Category {
      Category
      ID
    }
    Category_ID
    Latitude
    Longitude
    Requested_Timestamp
    Submission_User_ID
    User {
      Surname
      Name
    }
  }
}
`

type QueryReturns = {
  places: Place[],
  user_by_number: User,
  place_submissions: Place_Submission[]
}

export default function MapScreen({ route, navigation } : any) {
  const { phoneNumber } = route.params;
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const mapRef = createRef<MapView>();
   
  const [mapDisplays, setMapDisplays] = useState('all');

  const loadMorerationPage = () =>{
    navigation.navigate("PlaceSubmissionsModeration", {
      place_submissions: place_submissions
    })
  };

  const onSearch = () =>{
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
      })}
      )();
    }, []);

  const { data, loading, error } = useQuery<QueryReturns>(MARKERS_QUERY, {
    variables: {
      number: phoneNumber
    },
    onCompleted: data => {
      console.log(data)
    }
    
  });

  if (loading) return <Loading />
  if (error) return <Loading />
  const places = data!.places
  const place_submissions = data!.place_submissions
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <SafeAreaView style={styles.container}>
        <View>
          <MapView ref={mapRef} style={styles.map} 
            initialRegion={{
              latitude: 56.95153,
              longitude: 24.09986,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
            showsMyLocationButton={true}
            mapPadding={ {bottom: 60, top: 0, right: 0, left: 0} }
          >
            <MarkersChoise styles={styles} placeArr={places} mapDisplays={mapDisplays} />
          </MapView>
          { data?.user_by_number.Role == "ADMIN" ? <AdminButton onPress={loadMorerationPage} /> : null}
          <Button label="Search" onPress={onSearch}/>
          <SearchBar isVisible={isSearchVisible} onClose={onSearchClose} setMapDisplays={setMapDisplays} />
        </View>
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
  icons_on_map: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
    height: 28,
    width: 28,
  }
});