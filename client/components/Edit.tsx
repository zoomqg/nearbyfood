import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import StarSvg from '../assets/svgs/Star';
import PriceSvg from '../assets/svgs/Price';
import { useState } from 'react';

export default function Eidt() {
  const [raiting, setRaiting] = useState<number>(1);
  const [price, setPrice] = useState<number>(1);
  const [text, setText] = useState<string>("");

  const submit = () => {
    alert(`Raiting: ${raiting}\nPrice: ${price}\nText: ${text}`);
  }

  return (
    <View style={styles.component}>
      <Text style={styles.title}>Leave feedback</Text>
      <View style={styles.input}>
        <Text style={styles.subtitle}>Rating</Text>
        <View style={styles.buttonsList}>
          {
            Array.from(new Array(5)).map((_, i) => (
              <Pressable key={i} onPress={() => setRaiting(i + 1)}><StarSvg active={i < raiting ? true : false} /></Pressable>
            ))
          }
        </View>
      </View>
      <View style={styles.input}>
        <Text style={styles.subtitle}>Price</Text>
        <View style={styles.buttonsList}>
          {
            Array.from(new Array(5)).map((_, i) => (
              <Pressable key={i} onPress={() => setPrice(i + 1)}><PriceSvg active={i < price ? true : false} /></Pressable>
            ))
          }
        </View>
      </View>
      <TextInput
        editable
        multiline
        maxLength={40}
        placeholder='Leave your comment here'
        value={text}
        onChangeText={text => setText(text)}
        style={styles.textarea}
      />
      <Pressable onPress={() => submit()} style={styles.button}><Text style={styles.buttonText}>Submit</Text></Pressable>
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
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  subtitle: {
    fontWeight: '400',
    fontSize: 16,
  },
  buttonsList: {
    flexDirection: 'row',
    gap: 4
  },
  textarea: {
    height: 170,
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    fontWeight: '400',
    fontSize: 16,
  },
  button: {
    height: 40,
    backgroundColor: '#0B79D0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  }
});