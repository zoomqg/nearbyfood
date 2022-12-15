import { Pressable, StyleSheet, Image } from 'react-native';
import ImageURLS from './ImagesURLs';
import { Place_Submission } from '../types';
type AdminButtonProps = {
    place_submissions: Place_Submission[]
}

export default function AdminButton({ place_submissions }: AdminButtonProps){
    function submissions_to_string(arr: Place_Submission[]) {
        let result = '';
        arr.map((obj) => {
            result+= `Submission #${obj.ID}:\n`;
            result+= `Submission Author: ${obj.User.Name} ${obj.User.Surname}\n`;
            result+= `Place: ${obj.Title}\n`;
            result+= `Adress: ${obj.Adress}\n`;
            result+= "\n"
            result+= "=========================\n";
            result+= "\n"
        });
        return result;
    }

    return(
        <Pressable style={styles.adminbtn} onPress={() => alert(submissions_to_string(place_submissions))}>
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