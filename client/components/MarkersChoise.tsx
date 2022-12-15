import { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, StatusBar, Image } from 'react-native'; 
import ImageURLS from '../components/ImagesURLs';
import { Place } from '../types';

export default function MarkersChoise({ styles, placeArr, mapDisplays }: any) {
    if (mapDisplays === 'all') {
        return (
            placeArr.map((place: Place) => (
                <Marker coordinate={ {latitude: place.Latitude, longitude: place.Longitude}} key={place.ID} description={String(place.Adress)} title={place.Title}>
                    <Image source={ImageURLS.with_bg[place.Category.Category as keyof typeof ImageURLS.with_bg]} style={styles.icons_on_map} />
                </Marker>
            ))
        );
    }
    else {
        const filtredPlaces = placeArr.filter(function(place: Place) {
            return place.Category.Category === mapDisplays
        });
        return(
        filtredPlaces.map((place: Place) => (
                <Marker coordinate={ {latitude: place.Latitude, longitude: place.Longitude}} key={place.ID} description={String(place.Adress)} title={place.Title}>
                    <Image source={ImageURLS.with_bg[place.Category.Category as keyof typeof ImageURLS.with_bg]} style={styles.icons_on_map} />
                </Marker>
            ))
        );
    }
};