import { Text, StyleSheet } from "react-native"

function Title({children, textStyle}) {
    return <Text style= {[styles.title, textStyle]}>
        {children}
    </Text>
}

export default Title;

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 28,
        color: 'white',
        textAlign: 'center'
      },
});