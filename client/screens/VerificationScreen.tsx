import { StyleSheet, Text, View, Pressable, TextInput , Button } from 'react-native'; 
import React, { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useMutation } from '@apollo/client';
import Loading from '../components/Loading';


const APPROVE_SMS_MUTATION = gql`
    mutation ApproveSMS($number: String!, $code: String!) {
        approveSMS(number: $number, code: $code) {
            existence_check
            status
        }
    }

`

export default function VerificationScreen({ route, navigation } : any) {
    const [text, setText] = useState('');
    const { phoneNumber } = route.params;

    const [approveSMS, { error, loading }] = useMutation(APPROVE_SMS_MUTATION, {
        onCompleted: data => {
            if (data.approveSMS.status == 200) {
                // navigation.navigate("Map", {
                //     phoneNumber: phoneNumber
                // });
                
                if (data.approveSMS.existence_check == 0) {
                    navigation.navigate("Registration", {
                        phoneNumber: phoneNumber
                    });
                } else {
                    navigation.navigate("Map", {
                        phoneNumber: phoneNumber
                    });
                }
            }
            else {
                alert("Something went wrong")
            }
        }
    });

    if (error) return <Text>Error...{error.message}</Text>
    if (loading) return <Loading></Loading>

    const verifyNumber = () => {
        approveSMS({ variables: {
            number: phoneNumber,
            code: text
        } })
    };


    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.header_text}>Enter Verification Code</Text>
            <Text style={styles.h2}>
                <Text>Enter the code we sent to your mobile number</Text>
                <Text style={styles.h2_number}> {phoneNumber} </Text>
            </Text>
            <View style={styles.input_container}>
                <TextInput style={styles.input} placeholder="Code" onChangeText={(text) => setText(text)} value={text} keyboardType={'number-pad'}/>
                <Pressable style={styles.btn} onPress={() => verifyNumber()} >
                    <Text style={styles.btn_text}>SUBMIT</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      paddingHorizontal: 40
    },
    header_text: {
        fontWeight: '600',
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'left',
    },
    h2: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 25,
        textAlign: 'left',
        marginTop: 8
    },
    h2_number: {
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 25,
        textAlign: 'left',
    },
    input_container: {
        alignItems: 'center',
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