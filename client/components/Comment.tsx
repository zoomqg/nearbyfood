import { Pressable, StyleSheet, Text, View } from 'react-native';
import MiniStarSvg from '../assets/svgs/MiniStar';
import MiniPriceSvg from '../assets/svgs/MiniPrice';
import PencilSvg from '../assets/svgs/Pencil';
import TrashSvg from '../assets/svgs/Trash';

export default function Comment() {
  let canEdit = true;

  return (
    <View style={styles.comment}>
      <View style={styles.titleBar}>
        <Text>Misha Bender:</Text>
        <View style={styles.icons}>
          <MiniStarSvg />
          <Text>4.0</Text>
          <MiniPriceSvg />
          <Text>4.0</Text>
        </View>
      </View>
      <View style={styles.commentBlock}>
        <Text style={canEdit && { width: '90%' }}>so cool, i like heavy druuuugs</Text>
        {
          canEdit &&
          <View style={styles.icons}>
            <Pressable>
              <PencilSvg />
            </Pressable>
            <Pressable>
              <TrashSvg />
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