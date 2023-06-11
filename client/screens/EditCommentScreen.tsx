import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import Edit from "../components/EditingFeedback";
export default function EditCommentScreen({ route, navigation }: any) {
  const { feedback_id, user_id } = route.params;
  return (
    <View style={styles.container}>
      <Edit feedback_id={parseInt(feedback_id)} user_id={parseInt(user_id)} label={"Editing Feedback:"} onSuccess={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
  },
});
