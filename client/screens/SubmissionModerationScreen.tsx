import React from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useMutation, useQuery } from '@apollo/client';
import Loading from '../components/Loading';
import AdminButtons from '../assets/svgs/AdminButtons';
import { Place_Submission } from '../types';
import { PROCESS_SUBMISSION_MUTATION, GET_SUBMISSIONS } from '../gql';


export default function PlaceSubmissionsModerationScreen({ route, navigation }: any) {
  const { loading: queryLoading, error: queryError, data } = useQuery(GET_SUBMISSIONS);
  const [processSubmissionMutation, { loading: mutationLoading, error: mutationError }] = useMutation(PROCESS_SUBMISSION_MUTATION, {
    refetchQueries: [{ query: GET_SUBMISSIONS }],
  });

  if (queryLoading || mutationLoading) {
    return <Loading />;
  }

  if (queryError || mutationError) {
    return <Text>Error...{queryError ? queryError.message : mutationError?.message}</Text>;
  }

  const place_submissions = data?.place_submissions || [];

  const processSubmission = (decision: boolean, place_id: number) => {
    processSubmissionMutation({
      variables: {
        placeSubmissionId: place_id,
        add: decision,
      },
      refetchQueries: [{ query: GET_SUBMISSIONS }],
    });
  };

  return (
    <SafeAreaView style={styles.submissioncontainer}>
      <Text style={styles.title_text}>Place submissions</Text>
      <AdminButtons />
      <View style={styles.description_container}>
        <Text style={styles.description_text}>This is admin panel</Text>
        <Text style={styles.description_text}>Here you can approve / deny place submission</Text>
      </View>
      <ScrollView style={styles.submissions_container}>
        {place_submissions.map((submission: Place_Submission, index: number) => (
          <View key={index} style={styles.submission_container}>
            <View style={styles.space_between_block}>
              <Text style={styles.place_box_title_and_author_text}>{submission.Title}</Text>
              <Text style={styles.place_box_title_and_author_text}>{submission.User.Name} {submission.User.Surname}</Text>
            </View>
            <Text style={styles.category}>{submission.Category.Category.toUpperCase()}</Text>
            <Text style={styles.adress}>{submission.Adress}</Text>
            <Text style={styles.place_description}>{submission.Comment}</Text>
            <View style={styles.space_between_block}>
              <Pressable style={styles.approve_button} onPress={() => processSubmission(true, parseInt(submission.ID, 10))}>
                <Text style={styles.btn_text}>Approve</Text>
              </Pressable>
              <Pressable style={styles.deny_button} onPress={() => processSubmission(false, parseInt(submission.ID, 10))}>
                <Text style={styles.deny_text}>Deny</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
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
    marginBottom: 16,
  },
  description_container: {
    marginTop: 22,
  },
  submission_container: {
    marginTop: 16,
    width: 340,
    maxHeight: 300,
    borderColor: '#f0eeeb',
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
    marginBottom: 8,
  },
  submissions_container: {
    maxHeight: 400,
  },
  adress: {
    fontWeight: '400',
    fontSize: 16,
    marginBottom: 16,
  },
  place_description: {
    marginBottom: 22,
    fontWeight: '400',
    fontSize: 16,
    fontStyle: 'italic',
  },
  space_between_block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  place_box_title_and_author_text: {
    fontWeight: '600',
    fontSize: 16,
    fontStyle: 'normal',
  },
  input: {
    width: 324,
    height: 52,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F1F4FA',
    borderColor: '#F1F4FA',
    marginTop: 12,
  },
  approve_button: {
    backgroundColor: '#0B79D0',
    borderRadius: 8,
    width: 140,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deny_button: {
    borderColor: '#0B79D0',
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
    color: '#FFFFFF',
  },
  deny_text: {
    fontWeight: '500',
    fontSize: 16,
    color: '#0B79D0',
  },
  admin_buttons: {
    marginBottom: 32,
  },
});
