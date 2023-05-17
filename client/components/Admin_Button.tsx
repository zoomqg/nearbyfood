import { Pressable, StyleSheet, Image } from 'react-native';
import ImageURLS from './ImagesURLs';
import { Place_Submission } from '../types';



export default function AdminButton({ onPress }: any){
    return(
        <Pressable style={styles.adminbtn} onPress={onPress}>
            <Image source={ImageURLS.admin_button} style={styles.adminbtn_img} />
        </Pressable>
    )
};

const styles = StyleSheet.create({
    adminbtn: {
        display: 'flex',
        alignItems: 'flex-start',
        position: 'absolute',
        marginTop: 12,
        marginLeft: 12
    },
    adminbtn_img: {
        width: 44,
        height: 44,
        justifyContent: 'flex-start'
    }
});