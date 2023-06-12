import React, { useState } from "react";
import { StyleSheet, Pressable, View, Image, TextInput, ScrollView, Text, Dimensions } from 'react-native';
import SearchSvg from "../assets/svgs/Search";
import { Place } from "../types";
import ImageURLS from "../components/ImagesURLs";
import StarSvg from '../assets/svgs/Star';
import PriceSvg from '../assets/svgs/Price';
import { SEARCH_QUERY } from "../gql";
import Loading from "../components/Loading";
import { gql, useLazyQuery } from '@apollo/client';

type QueryReturns = {
  places_by_name: Place[];
};


export default function SearchScreen({ route, navigation }: any) {
  const { user_id } = route.params;
  const [resultArr, setResultArr] = useState<Array<Place> | null>(null);
  const [searchText, setSearchText] = useState('');
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);

  const [getPlacesByName, { data, loading, error }] = useLazyQuery<QueryReturns>(SEARCH_QUERY, {
    onCompleted(data) {
      setResultArr(data.places_by_name)
      console.log(resultArr);
    },
  });

  if (loading || error) return <Loading />;

  const handleSearch = () => {
    if (searchText === '') {
      setIsSearchEmpty(true);
      return;
    }
    setIsSearchEmpty(false);
    getPlacesByName({ variables: { searchValue: searchText } });
  };

  const navigateToOtherScreen = (place: Place) => {
    navigation.navigate('PlaceScreen', {
      place: place,
      user_id: user_id
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, isSearchEmpty && styles.searchContainerEmpty]}>
        <Pressable onPress={handleSearch}>
          <SearchSvg />
        </Pressable>
        <TextInput
          style={styles.searchInput}
          placeholder="Type Something"
          onChangeText={text => setSearchText(text)}
          onSubmitEditing={handleSearch}
          value={searchText}
          maxLength={50}
        />
      </View>
      <View style={styles.all_results}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {resultArr?.map((place, i) => (
            <Pressable key={i} onPress={() => {navigateToOtherScreen(place)}}>
              <View style={styles.result_container}>
                <View>
                  <Text style={styles.place_title} numberOfLines={1} ellipsizeMode="tail" >{place.Title}</Text>
                  <Text style={styles.place_adress} numberOfLines={1} ellipsizeMode="tail">{place.Adress}</Text>
                  <View style={[styles.buttonsList, { marginBottom: 9 }]}>
                    {
                      Array.from(new Array(5)).map((_, i) => (
                        <StarSvg key={i} active={i < place.Avg_Rating ? true : false} size={"16"} />
                      ))
                    }
                  </View>
                  <View style={styles.buttonsList}>
                    {
                      Array.from(new Array(5)).map((_, i) => (
                        <PriceSvg key={i} active={i < place.Avg_Budget_Rating ? true : false} size={"16"} />
                      ))
                    }
                  </View>
                </View>
                <View style={styles.image_container}>
                  <Image source={ImageURLS.without_shadow[place.Category!.Category as keyof typeof ImageURLS.without_shadow]} style={styles.imgStyle} />
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 46,
    paddingHorizontal: 26,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    borderWidth: 1,
  },
  searchContainerEmpty: {
    borderColor: 'red',
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
  },
  result_container: {
    width: "100%",
    height: 108,
    borderColor: "#E2E2E2",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: 'row',
  },
  all_results: {
    width: "100%",
    height: Dimensions.get('window').height,
  },
  imgStyle: {
    width: 50,
    height: 50
  },
  image_container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  place_title: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 20,
    width: 100,
  },
  place_adress: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 14,
    marginBottom: 9,
    width: 200,
  },
  buttonsList: {
    flexDirection: 'row',
    gap: 4
  },
});