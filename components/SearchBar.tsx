import { Modal, View, Text, Pressable, StyleSheet, Image, Dimensions } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import GestureRecognizer from 'react-native-swipe-gestures';
import IconsList from '../components/IconsList';
import Button from './Button';

export default function SearchBar({ isVisible, children, onClose }: any) {
  const setPickedIcon = () => {
    console.log('negr')
  }
  return (
    <GestureRecognizer
      style={{flex: 1}}
      onSwipeDown={onClose}
    >
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Image source={require('../assets/searchbar/line.png')} style={styles.lineImage}></Image>
          </View>
          <IconsList onSelect={(setPickedIcon)} onCloseModal={onClose} />
          <Pressable
            onPress={() => {setPickedIcon()}}>
            <Image source={require('../assets/searchbar/Searchbar.png')} style={styles.seachImg} />
        </Pressable>
          <Button label="Search" onPress={setPickedIcon} />
        </View>
      </Modal>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
    modalContent: {
      paddingLeft: 28,
      paddingRight: 28,
      height: '36%',
      width: '100%',
      backgroundColor: '#FFFFFF',
      borderTopRightRadius: 18,
      borderTopLeftRadius: 18,
      position: 'absolute',
      bottom: 0,
    },
    titleContainer: {
      height: '16%',
      backgroundColor: '#FFFFFF',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      color: '#000',
      fontSize: 16,
    },
    pickerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 50,
      paddingVertical: 20,
    },
    lineImage: {
      marginTop: 24,
      width: 100
    },
    seachImg: {
      width: Dimensions.get('window').width * 0.85,
      height: 512 / (3063 / (Dimensions.get('window').width * 0.85)),
      marginBottom: 96
    }
  });