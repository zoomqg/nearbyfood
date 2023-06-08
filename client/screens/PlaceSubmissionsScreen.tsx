import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, TextInput, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CloshSvg from '../assets/svgs/Closh';
import Button from '../components/Button';
import { CATEGORIES_QUERY, SEND_PLACE_MUTATION } from '../gql';
import { gql, useMutation, useQuery } from '@apollo/client';
import Loading from '../components/Loading';
import { Category } from '../types';

const formatCategory = (category: string) => {
    let data = category.replace(/_/g, " ")
    return (data.charAt(0).toUpperCase() + data.slice(1))
}

export default function PlaceSubmissionsScreen({ route, navigation }: any) {
    const [selectedCategory, setCategory] = useState('');
    const [name, setName] = useState('');
    const [adress, setAdress] = useState('');
    const [comment, setComment] = useState('');
    const { user_id } = route.params;
    const { loading: queryLoading, error: queryError, data } = useQuery(CATEGORIES_QUERY);
    const [categoryError, setCategoryError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [adressError, setAdressError] = useState(false);

    const [sendPlaceMutation, { error: mutationError }] = useMutation(SEND_PLACE_MUTATION, {
        onCompleted: () => {
            Alert.alert('Success', 'Place submitted successfully.', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        },
        onError: (error) => {
            console.log(error);
            Alert.alert('Error', 'An error occurred while submitting the place.');
        },
    });

    if (queryLoading) {
        return <Loading />;
    }

    const categories = data?.categories || [];

    const validateAndPush = () => {
        if (selectedCategory === '') {
            setCategoryError(true);
        }
        if (name.trim() === '') {
            setNameError(true);
        }
        if (adress.trim() === '') {
            setAdressError(true);
        }
        if (selectedCategory !== '' && name.trim() !== '' && adress.trim() !== '') {
            console.log(name, adress, comment, selectedCategory);
            sendPlaceMutation({
                variables: {
                    submissionUserId: parseInt(user_id),
                    categoryId: parseInt(selectedCategory),
                    adress: adress,
                    title: name,
                },
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title_text}>Place submission</Text>
                <CloshSvg />
                <Text style={styles.description_text}>Know some place that we don't?</Text>
                <Text style={styles.description_text}>Share it with us :)</Text>
                <View style={styles.value_inputs}>
                    <View style={[styles.select_box, categoryError && styles.error]}>
                        <Picker
                            itemStyle={{height:50}}
                            style={{ color: "#1C2439" }}
                            selectedValue={selectedCategory}
                            onValueChange={(itemValue) => {
                                setCategory(itemValue);
                                setCategoryError(false);
                            }}
                        >
                            <Picker.Item label="Category" value="" />
                            {categories.map((category: Category, index: number) => (
                                <Picker.Item
                                    label={formatCategory(category.Category)}
                                    value={category.ID}
                                    key={index}
                                />
                            ))}
                        </Picker>
                    </View>
                    <TextInput
                        style={[styles.input_boxes, nameError && styles.error]}
                        placeholderTextColor="#1C2439"
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                        onFocus={() => setNameError(false)}
                    />
                    <TextInput
                        style={[styles.input_boxes, adressError && styles.error]}
                        placeholderTextColor="#1C2439"
                        placeholder="Address"
                        value={adress}
                        onChangeText={setAdress}
                        onFocus={() => setAdressError(false)}
                    />
                    <TextInput
                        style={[styles.input_boxes, styles.comment]}
                        placeholderTextColor="#1C2439"
                        placeholder="Comment"
                        multiline={true}
                        value={comment}
                        onChangeText={setComment}
                    />
                </View>
                <Button label="Request" onPress={validateAndPush} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: 44
    },
    contentContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title_text: {
        fontWeight: '500',
        fontSize: 18,
        marginBottom: 16,
    },
    description_text: {
        fontWeight: '500',
        fontSize: 16,
        textAlign: 'center',
    },
    input_boxes: {
        height: 64,
        backgroundColor: "#F1F4FA",
        borderRadius: 8,
        paddingLeft: 14,
        marginBottom: 8,
        fontSize: 16,
    },
    select_box: {
        width: Dimensions.get('window').width - 40,
        height: 64,
        backgroundColor: "#F1F4FA",
        borderRadius: 8,
        paddingTop: 4,
        marginBottom: 8,
        fontSize: 12,
    },
    value_inputs: {
        marginTop: 32,
        // maxWidth: 320,
    },
    comment: {
        height: 140,
        textAlignVertical: 'top',
        paddingTop: 16,
        paddingRight: 4,
        marginBottom: 84
    },
    error: {
        borderColor: 'red',
        borderWidth: 1,
    },
});
