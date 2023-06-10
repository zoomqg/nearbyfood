import { Modal, View, Pressable, StyleSheet, Image, Dimensions } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import IconsList from './IconsList';

export default function FilterBar({ isVisible, onClose, setMapDisplays, moveToPlaceSubmissionScreen }: any) {
  const setPickedIcon = (item: any) => {
    setMapDisplays(item);
  };

  return (
    <GestureRecognizer
      style={{ flex: 1 }}
      onSwipeDown={onClose}
    >
      <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Image source={require('../assets/searchbar/line.png')} style={styles.lineImage} />
          </View>
          <IconsList onSelect={setPickedIcon} onCloseModal={onClose} />
        </View>
      </Modal>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    paddingLeft: 28,
    paddingRight: 28,
    height: '15%',
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
  lineImage: {
    marginTop: 24,
    width: 100
  },
  searchImg: {
    width: Dimensions.get('window').width * 0.85,
    height: 512 / (3063 / (Dimensions.get('window').width * 0.85)),
    marginBottom: 96
  }
});
