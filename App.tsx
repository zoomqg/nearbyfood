import { StyleSheet, Text, View, Dimensions } from 'react-native'; 
import MapView from 'react-native-maps';

import Button from './components/Button';

const onSearch = () =>{
  console.log('negr');
}

export default function App() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <Button label="Search" onPress={onSearch}/>
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
  map: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
});