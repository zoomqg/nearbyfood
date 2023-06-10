import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import ReportSvg from '../assets/svgs/Report';
import LocationSvg from '../assets/svgs/Location';
import MiniStarSvg from '../assets/svgs/MiniStar';
import MiniPriceSvg from '../assets/svgs/MiniPrice';
import ClockSvg from '../assets/svgs/Clock';
import ManSvg from '../assets/svgs/Man';
import Comment from './Comment';
import { useState } from 'react';

export default function Info() {
  const [showeMore, setShowMore] = useState(false);

  return (
    <View style={styles.component}>
      <View style={styles.input}>
        <Text style={styles.title}>Dominos Pizza</Text>
        <View style={styles.icons}>
          <Pressable>
            <ReportSvg />
          </Pressable>
          <Pressable>
            <LocationSvg />
          </Pressable>
        </View>
      </View>
      <View style={showeMore ? styles.hideninput : styles.input}>
        <View style={styles.icons}>
          <MiniStarSvg />
          <Text style={styles.subtitle}>4.0</Text>
          <MiniPriceSvg />
          <Text style={styles.subtitle}>4.0</Text>
        </View>
        <Pressable onPress={() => setShowMore(!showeMore)}>
          {
            showeMore ?
              <Text style={styles.hidensubtitle}>Augusta Deglava iela 100, Riga</Text>
              :
              <Text numberOfLines={1} ellipsizeMode='tail' style={styles.hidensubtitle}>Augusta Deglava iela 100, Riga</Text>
          }
        </Pressable>
      </View>
      <View style={styles.input}>
        <View style={styles.icons}>
          <ClockSvg />
          <Text style={styles.subtitle}>29.05.2023</Text>
        </View>
        <View style={styles.icons}>
          <ManSvg />
          <Text style={styles.subtitle}>Danila Kulakovs</Text>
        </View>
      </View>
      <Text style={styles.titleh2}>Comments</Text>
      <View style={styles.commentsList}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            Array.from(new Array(8)).map((_, i) => (
              <Comment key={i} />
            ))
          }
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  component: {
    gap: 14,
    padding: 50
  },
  title: {
    fontWeight: '700',
    fontSize: 24,
  },
  titleh2: {
    marginTop: 10,
    fontWeight: '700',
    fontSize: 20,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  hideninput: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  subtitle: {
    fontWeight: '400',
    fontSize: 16,
  },
  hidensubtitle: {
    fontWeight: '400',
    fontSize: 16,
    width: 150,
    textAlign: 'right'
  },
  icons: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  commentsList: {
    height: 280
  }
});