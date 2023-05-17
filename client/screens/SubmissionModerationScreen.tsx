import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { gql, useMutation } from '@apollo/client';
import Loading from '../components/Loading';
import AdminButtons from '../assets/svgs/AdminButtons';
import { Place_Submission } from '../types';

export default function PlaceSubmissionsModerationScreen({ route, navigation }: any) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const { place_submissions } = route.params;
  // const [registerUser, { error, loading }] = useMutation(REGISTER_MUTATION, {
  //     onCompleted: () => {
  //         navigation.navigate("Map", {
  //             phoneNumber: phoneNumber
  //         });
  //     },
  // });

  // if (error) return <Text>Error...{error.message}</Text>
  // if (loading) return <Loading></Loading>

  // const precessRegistration = () => {
  //     registerUser({ variables: {
  //         number: phoneNumber,
  //         name: name,
  //         surname: surname
  //     } })
  // }

  return (
    <SafeAreaView style={styles.submissioncontainer}>
      <Text style={styles.title_text}>Place submissions</Text>
      <AdminButtons />
      <View style={styles.description_container}>
        <Text style={styles.description_text}>This is admin panel</Text>
        <Text style={styles.description_text}>Here you can approve / deny place submission</Text>
      </View>
      <View style={styles.submission_container}>
        <View style={styles.space_between_block}>
          <Text style={styles.place_box_title_and_author_text}>{place_submissions[0]["Title"]}</Text>
          <Text style={styles.place_box_title_and_author_text}>{place_submissions[0]["User"]["Name"] + " " + place_submissions[0]["User"]["Surname"]}</Text>
        </View>
        <Text style={styles.category}>{place_submissions[0]["Category"]["Category"].toUpperCase()}</Text>
        <Text style={styles.adress}>{place_submissions[0]["Adress"]}</Text>
        <Text style={styles.place_description}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. </Text>
        <View style={styles.space_between_block}>
          <Pressable style={styles.approve_button} onPress={() => console.log("123")} >
            <Text style={styles.btn_text}>Approve</Text>
        </Pressable>
          <Pressable style={styles.deny_button} onPress={() => console.log("123")} >
            <Text style={styles.deny_text}>Deny</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  submissioncontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  title_text: {
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 16
  },
  description_container: {
    marginTop: 22
  },
  submission_container: {
    marginTop: 16,
    width: 340,
    height: 300,
    borderColor: "#f0eeeb",
    borderRadius: 10,
    borderWidth: 2,
    paddingTop: 18,
    paddingLeft: 22,
    paddingRight: 21,
    paddingBottom: 26,
  },
  description_text: {
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
  },
  category: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 8
  },
  adress: {
    fontWeight: '400',
    fontSize: 16,
    marginBottom: 16,
  },
  place_description: {
    height: 92,
    fontWeight: '400',
    fontSize: 16
  },
  space_between_block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2
  },
  place_box_title_and_author_text: {
    fontWeight: '600',
    fontSize: 16,
    fontStyle: 'normal'
  },
  input: {
    width: 324,
    height: 52,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#F1F4FA",
    borderColor: "#F1F4FA",
    marginTop: 12,
  },
  approve_button: {
    backgroundColor: "#0B79D0",
    borderRadius: 8,
    width: 140,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deny_button: {
    borderColor: "#0B79D0",
    borderRadius: 10,
    borderWidth: 2,
    width: 140,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_text: {
    fontWeight: '500',
    fontSize: 16,
    color: "#FFFFFF",
  },
  deny_text: {
    fontWeight: '500',
    fontSize: 16,
    color: "#0B79D0",
  },
  admin_buttons: {
    marginBottom: 32
  },
})