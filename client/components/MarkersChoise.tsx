import React from 'react';
import { Marker } from 'react-native-maps';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import ImageURLS from '../components/ImagesURLs';
import { Place } from '../types';
import { useNavigation } from '@react-navigation/native';

type MarkersChoiseProps = {
  styles: any;
  placeArr: Place[];
  mapDisplays: string;
  user_id: number
};

const MarkersChoise: React.FC<MarkersChoiseProps> = ({ styles, placeArr, mapDisplays, user_id }) => {
  const navigation = useNavigation();

  const navigateToOtherScreen = (place: Place) => {
    navigation.navigate('PlaceScreen', {
      place: place,
      user_id: user_id
    });
  };

  const filteredPlaces = mapDisplays === 'all' ? placeArr : placeArr.filter((place) => place.Category.Category === mapDisplays);

  return (
    <>
      {filteredPlaces.map((place) => (
        <Marker
          coordinate={{ latitude: place.Latitude, longitude: place.Longitude }}
          key={place.ID}
          description={String(place.Adress)}
          title={place.Title}
          onPress={() => navigateToOtherScreen(place)}
        >
          <TouchableOpacity activeOpacity={0.8} style={styles.markerContainer}>
            <Image source={ImageURLS.with_bg[place.Category.Category as keyof typeof ImageURLS.with_bg]} style={styles.icons_on_map} />
          </TouchableOpacity>
        </Marker>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons_on_map: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    height: 28,
    width: 28,
  },
});

export default MarkersChoise;
