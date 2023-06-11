import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, Modal, Alert } from 'react-native';
import ReportSvg from '../assets/svgs/Report';
import LocationSvg from '../assets/svgs/Location';
import MiniStarSvg from '../assets/svgs/MiniStar';
import MiniPriceSvg from '../assets/svgs/MiniPrice';
import ClockSvg from '../assets/svgs/Clock';
import ManSvg from '../assets/svgs/Man';
import Comment from './CommentBlock';
import BackSvg from '../assets/svgs/Back';
import { useState } from 'react';
import { Place, FeedBack } from '../types';
import Button from './Button';
import { SEND_REPORT_MUTATION, GET_FEEDBACK_FOR_PLACE } from '../gql';
import { useMutation, useQuery } from '@apollo/client';
import * as Linking from 'expo-linking';
import Loading from './Loading';



type InfoType = {
  place: Place,
  user_id: number
}

type QueryReturns = {
  feedback_for_place: FeedBack[];
};

export default function Info({ place, user_id }: InfoType) {
  const [showMore, setShowMore] = useState(false);
  const [isReportModalVisible, setReportModalVisible] = useState(false);
  const [reportText, setReportText] = useState('');
  const [isInputValid, setInputValid] = useState(true);

  const convertTimestampToDate = (timestamp: string): string => {
    const date = new Date(parseInt(timestamp, 10));
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}.${month}.${year}`;
  };

  const showReportModal = () => {
    setReportText("")
    setReportModalVisible(true);
  };

  const hideModal = () => {
    setReportModalVisible(false);
  };
  const errorAlert = (error: any) => {
    console.log(error);
    Alert.alert('Error', 'An error occurred while submitting report.');
  }
  const [sendReportMutation, { error: mutationError }] = useMutation(SEND_REPORT_MUTATION, {
    onCompleted: (data) => {
      if (data.makeReport == 200) {
        Alert.alert('Success', 'Report submitted successfully.', [
          { text: 'OK', onPress: () => hideModal() }
        ]);
      }
      else {
        errorAlert(data.makeReport)
      }
    },
    onError: (error) => {
      errorAlert(error)
    },
  });

  const handleSubmit = () => {
    if (reportText === "") {
      setInputValid(false);
    } else {
      setInputValid(true);
      sendReportMutation({
        variables: {
          placeId: parseInt(place.ID),
          userId: user_id,
          report: reportText
        }
      });
    }
  };

  const moveToMap = () => {
    const url_param = place.Latitude + "+" + place.Longitude;
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${url_param.replaceAll(" ", "+")}`);
  };

  const { loading: queryLoading, error: queryError, data } = useQuery<QueryReturns>(GET_FEEDBACK_FOR_PLACE, {
    variables: {
      placeId: place.ID
    }
  });

  if (queryLoading) {
    return <Loading />;
  }

  const feedback_arr = data!.feedback_for_place;
  return (
    <View style={styles.component}>
      <View style={styles.input}>
        <Text style={styles.title}>{place.Title}</Text>
        <View style={styles.icons}>
          <Pressable onPress={showReportModal}>
            <ReportSvg />
          </Pressable>
          <Pressable onPress={moveToMap}>
            <LocationSvg />
          </Pressable>
        </View>
      </View>
      <View style={showMore ? styles.hideninput : styles.input}>
        <View style={styles.icons}>
          <MiniStarSvg />
          <Text style={styles.subtitle}>
            {place.Avg_Rating ? place.Avg_Rating.toFixed(1) : ':('}
          </Text>
          <MiniPriceSvg />
          <Text style={styles.subtitle}>
            {place.Avg_Budget_Rating ? place.Avg_Budget_Rating.toFixed(1) : ':('}
          </Text>
        </View>
        <Pressable onPress={() => setShowMore(!showMore)}>
          {showMore ? (
            <Text style={styles.hidensubtitle}>{place.Adress}</Text>
          ) : (
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.hidensubtitle}>
              {place.Adress}
            </Text>
          )}
        </Pressable>
      </View>
      <View style={styles.input}>
        <View style={styles.icons}>
          <ClockSvg />
          <Text style={styles.subtitle}>{convertTimestampToDate(place.Added_Timestamp!)}</Text>
        </View>
        <View style={styles.icons}>
          <ManSvg />
          <Text style={styles.subtitle}>
            {place.User?.Name + ' ' + place.User?.Surname}
          </Text>
        </View>
      </View>
      <Text style={styles.titleh2}>Comments</Text>
      <View style={styles.commentsList}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {feedback_arr.length > 0 ?
           feedback_arr.map((feedback, i) => (
            <Comment key={i} feedback={feedback} user_id={user_id} />
          )) :
            <Text>
              There is no comments yet...
            </Text>
          }
        </ScrollView>
      </View>
      <Modal visible={isReportModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Pressable style={styles.closeButton} onPress={hideModal}>
            <BackSvg />
          </Pressable>
          <Text style={styles.title_text}>Send your report</Text>
          <TextInput
            style={[
              styles.report_input,
              !isInputValid && styles.report_input_invalid
            ]}
            placeholder="Enter report here..."
            maxLength={255}
            onChangeText={(text) => setReportText(text)}
          />
          <Button label="Submit" onPress={handleSubmit} />
        </View>
      </Modal>
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  report_input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4
  },
  report_input_invalid: {
    borderColor: 'red',
  },
  title_text: {
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
