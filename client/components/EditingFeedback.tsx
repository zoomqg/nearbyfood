import { Pressable, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import StarSvg from '../assets/svgs/Star';
import PriceSvg from '../assets/svgs/Price';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SEND_NEW_FEEDBACK, EDIT_FEEDBACK } from '../gql';

type CommentType = {
  user_id: number;
  feedback_id?: number;
  label: string;
  place_id?: number;
  onSuccess: () => void;
}

export default function Edit({ user_id, label, feedback_id, place_id, onSuccess}: CommentType) {
  const [raiting, setRaiting] = useState<number>(1);
  const [budgetRaiting, setBudgetRaiting] = useState<number>(1);
  const [comment, setComment] = useState<string>("");
  const errorAlert = (error: any) => {
    console.log(error);
    Alert.alert('Error', 'An error occurred while submitting report.');
  }
  const [sendFeedbackMutation, { error: mutationError }] = useMutation(SEND_NEW_FEEDBACK, {
    onCompleted: (data) => {
      if (data.addFeedback == 200) {
        Alert.alert('Success', 'Feedback added successfully.', [
          { text: 'OK', onPress: () => onSuccess()}
        ]);
      }
      else {
        errorAlert(data.addFeedback)
      }
    },
    onError: (error) => {
      errorAlert(error)
    },
  });

  const [editFeedbackMutation, { error: anotherMutationError }] = useMutation(EDIT_FEEDBACK, {
    onCompleted: (data) => {
      if (data.changeFeedback == 200) {
        Alert.alert('Success', 'Feedback edited successfully.', [
          { text: 'OK', onPress: () => onSuccess() }
        ]);
      }
      else {
        errorAlert(data.changeFeedback)
      }
    },
    onError: (error) => {
      errorAlert(error)
    },
  });

  const submit = () => {
    if (!feedback_id) { // feedback_id is not assigned, that means that we are sending new comment 
      sendFeedbackMutation({
        variables: {
          budgetRating: budgetRaiting,
          comment: comment,
          userId: user_id,
          rate: raiting,
          placeId: place_id
        },
      })
    }
    else {
      editFeedbackMutation({
        variables: {
          feedbackId: feedback_id,
          userId: user_id,
          comment: comment,
          rate: raiting,
          budgetRating: budgetRaiting
        },
      })
    }
  }

  return (
    <View style={styles.component}>
      <Text style={styles.title}>{label}</Text>
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
              <Pressable key={i} onPress={() => setBudgetRaiting(i + 1)}><PriceSvg active={i < budgetRaiting ? true : false} /></Pressable>
            ))
          }
        </View>
      </View>
      <TextInput
        maxLength={140}
        placeholder='Leave your comment here'
        value={comment}
        onChangeText={text => setComment(text)}
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
    textAlignVertical: 'top',
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