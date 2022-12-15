import { useState } from 'react';
import { StyleSheet, FlatList, Image, Platform, Pressable } from 'react-native';
import { Category } from '../types';
import Loading from './Loading';
import ImageURLS from './ImagesURLs';

export default function IconsList({ onSelect, onCloseModal }: any) {
    const [icons] = useState(ImageURLS.with_shadow);
    
    return(
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={Platform.OS === 'web' ? true : false}
            data={Object.keys(icons)}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item, index }) => {
                return(
                    <Pressable
                        onPress={() => {
                        onSelect(item);
                        onCloseModal();
                        }}>
                        <Image source={icons[item as keyof typeof icons]} key={index} style={styles.image} />
                    </Pressable>
                );
            }}
        />
    );
}


const styles = StyleSheet.create({
    listContainer: {
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      paddingHorizontal: 20,
      flexDirection: 'row',
      marginTop: 28,
      justifyContent: 'space-between',
    },
    image: {
      width: 32,
      height: 32,
      marginRight: 20,
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
  });
  