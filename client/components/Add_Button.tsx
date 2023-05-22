import { Pressable, StyleSheet, Image } from 'react-native';
import ImageURLS from './ImagesURLs';



export default function AddButton({ onPress }: any){
    return(
        <Pressable style={styles.addbtn} onPress={onPress}>
            <Image source={ImageURLS.add_button} style={styles.addbtn_img} />
        </Pressable>
    )
};

const styles = StyleSheet.create({
    addbtn: {
        display: 'flex',
        alignItems: 'flex-start',
        position: 'absolute',
        marginTop: 12 + 52,
        marginLeft: 12
    },
    addbtn_img: {
        width: 44,
        height: 44,
        justifyContent: 'flex-start'
    }
});