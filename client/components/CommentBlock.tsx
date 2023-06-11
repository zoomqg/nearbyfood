import { Pressable, StyleSheet, Text, View } from 'react-native';
import MiniStarSvg from '../assets/svgs/MiniStar';
import MiniPriceSvg from '../assets/svgs/MiniPrice';
import PencilSvg from '../assets/svgs/Pencil';
import { FeedBack } from '../types';
import { useNavigation } from '@react-navigation/native';

type CommentType = {
  feedback: FeedBack;
  user_id: number;
}

export default function Comment({feedback, user_id}: CommentType) {
  const navigation = useNavigation();
  let canEdit = parseInt(feedback.User_ID) === parseInt(user_id);
  const navigateToOtherScreen = () => {
    navigation.navigate("EditCommentScreen", {
      feedback_id: feedback.ID,
      user_id: user_id,
    });
  };
  return (
    <View style={styles.comment}>
      <View style={styles.titleBar}>
        <Text>{feedback.User.Name + " " + feedback.User.Surname}</Text>
        <View style={styles.icons}>
          <MiniStarSvg />
          <Text>{feedback.Rate.toFixed(1)}</Text>
          <MiniPriceSvg />
          <Text>{feedback.Budget_Rating.toFixed(1)}</Text>
        </View>
      </View>
      <View style={styles.commentBlock}>
        <Text style={canEdit && { width: '90%' }}>{feedback.Comment ? feedback.Comment : "*no comment*"}</Text>
        {
          canEdit &&
          <View style={styles.icons}>
            <Pressable onPress={navigateToOtherScreen}>
              <PencilSvg />
            </Pressable>
          </View>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  comment: {
    marginVertical: 4,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  icons: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  commentBlock: {
    marginTop: 7,
    padding: 8,
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
});