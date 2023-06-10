import { StyleSheet, View, Pressable, Text, Dimensions } from 'react-native';

export default function Button({ label, onPress }: any) {
    return(
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: Dimensions.get('window').width,
        paddingLeft: 30,
        paddingRight: 30,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 18
    },
    button: {
        borderRadius: 20,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "#0B79D0"
      },
      buttonLabel: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 19
      },
});