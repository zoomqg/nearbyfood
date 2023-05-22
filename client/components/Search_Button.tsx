import { Pressable, StyleSheet, Image } from 'react-native';
import ImageURLS from './ImagesURLs';



export default function SearchButton({ onPress }: any){
    return(
        <Pressable style={styles.searchbtn} onPress={onPress}>
            <Image source={ImageURLS.search_button} style={styles.searchbtn_img} />
        </Pressable>
    )
};

const styles = StyleSheet.create({
    searchbtn: {
        display: 'flex',
        alignItems: 'flex-start',
        position: 'absolute',
        marginTop: 12,
        marginLeft: 12
    },
    searchbtn_img: {
        width: 44,
        height: 44,
        justifyContent: 'flex-start'
    }
});