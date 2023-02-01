import { Text, StyleSheet } from "react-native"

function Subtitle({children, textStyle}) {
    return <Text style= {[styles.subtitle, textStyle]}>
        {children}
    </Text>
}

export default Subtitle;

const styles = StyleSheet.create({
    subtitle: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center'
      },
});