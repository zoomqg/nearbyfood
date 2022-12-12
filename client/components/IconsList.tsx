import { useState } from 'react';
import { StyleSheet, FlatList, Image, Platform, Pressable } from 'react-native';

export default function IconsList({ onSelect, onCloseModal }: any) {
    const [icons] = useState([
        require('../assets/food_icons/icons_with_shadow/dining_room.png'),
        require('../assets/food_icons/icons_with_shadow/burger.png'),
        require('../assets/food_icons/icons_with_shadow/bakery.png'),
        require('../assets/food_icons/icons_with_shadow/cafe.png'),
        require('../assets/food_icons/icons_with_shadow/grocery.png'),
        require('../assets/food_icons/icons_with_shadow/pizzeria.png'),
        require('../assets/food_icons/icons_with_shadow/ramen.png'),
        require('../assets/food_icons/icons_with_shadow/restaurant.png'),
    ]);
    return(
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={Platform.OS === 'web' ? true : false}
            data={icons}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item, index }) => {
                return(
                    <Pressable
                        onPress={() => {
                        onSelect(item);
                        onCloseModal();
                        }}>
                        <Image source={item} key={index} style={styles.image} />
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
  