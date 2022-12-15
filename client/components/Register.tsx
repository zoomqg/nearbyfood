import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable, TextInput , Button } from 'react-native'; 
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { gql, useMutation } from '@apollo/client';
import Loading from './Loading';

const REGISTER_MUTATION = gql`
    mutation RegisterUser($number: String!, $name: String!, $surname: String!) {
        registerUser(number: $number, name: $name, surname: $surname) {
            ID
            Name
            Surname
            Login
            Password
            Phone
            Email
            Registration_Time
            Role
        }
    }
`;


export default function Register({ setUser, phone_number }: any){
    const [registerUser, { error, loading }] = useMutation(REGISTER_MUTATION, {
        onCompleted: data => {
            setUser(data.registerUser)
            console.log(data)
        },
    });

    if (error) return <Text>Error...{error.message}</Text>
    if (loading) return <Loading></Loading>

    const precessRegistration = () => {
        registerUser({ variables: {
            number: phone_number,
            name: name,
            surname: surname
        } })
    }
    
    
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    return(
        <View style={styles.regcontainer}>
            <Text style={styles.login_text}>Looks like you are new here!</Text>
            <Text style={styles.login_text}>Could you give me more info about you?</Text>
            <TextInput style={styles.input} placeholder="Name" onChangeText={(name) => setName(name)} value={name} />
            <TextInput style={styles.input} placeholder="Surname" onChangeText={(surname) => setSurname(surname)} value={surname} />
            <Pressable style={styles.btn} onPress={() => precessRegistration()} >
                <Text style={styles.btn_text}>SUBMIT</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    regcontainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingLeft: 16,
        paddingRight: 16
      },
      login_text: {
        fontWeight: '500',
        fontSize: 18,
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
      btn: {
        marginTop: 12,
        backgroundColor: "#5D5FEF",
        borderRadius: 8,
        width: 320,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
      },
      btn_text: {
        fontWeight: '500',
        fontSize: 16,
        color: "#FFFFFF",
      }
})