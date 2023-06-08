import { StyleSheet, Text, View, Pressable, TextInput, Button, Alert } from 'react-native';
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { gql, useMutation } from '@apollo/client';
import Loading from '../components/Loading';

const SEND_SMS_MUTATION = gql`
    mutation Mutation($number: String!) {
    sendSMS(number: $number)
    }
`

export default function AuthScreen({ navigation }: any) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isTextInputFocused, setIsTextInputFocused] = useState(false);

  const handleTextInputFocus = () => {
    if (!isTextInputFocused) {
      setPhoneNumber('+');
      setIsTextInputFocused(true);
    }
  };

  const [sendSMS, { error, loading }] = useMutation(SEND_SMS_MUTATION, {
    onCompleted: data => {
      if (data.sendSMS == 200) {
        navigation.navigate("Verification", {
          phoneNumber: phoneNumber
        });
      } else {
        alert("Something went wrong with sending the message");
      }
    }
  });

  if (error) return <Text>Error...{error.message}</Text>
  if (loading) return <Loading />;

  const phone_input = () => {
    if (phoneNumber.length <= 10) {
      alert('Something wrong with your number');
    } else {
      sendSMS({
        variables: {
          number: phoneNumber
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.login_text}>Log in / Sign up</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={(number) => setPhoneNumber(number)}
        onFocus={handleTextInputFocus}
        value={phoneNumber}
        keyboardType={'phone-pad'}
      />
      <Pressable style={styles.btn} onPress={() => phone_input()}>
        <Text style={styles.btn_text}>SUBMIT</Text>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40
  },
  login_text: {
    fontWeight: '500',
    fontSize: 18,
  },
  input: {
    width: "100%",
    height: 52,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#F1F4FA",
    borderColor: "#F1F4FA",
    marginTop: 12,
  },
  btn: {
    marginTop: 12,
    backgroundColor: "#5D5FEF",
    borderRadius: 8,
    width: "100%",
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_text: {
    fontWeight: '500',
    fontSize: 16,
    color: "#FFFFFF",
  }
});
