import { Text, StyleSheet, View, Pressable, Dimensions } from "react-native";

function PageButton({ children, onPress }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}
export default PageButton;

const deviceWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    width: deviceWidth * 1,
    justifyContents: "center",
  },
  buttonContainer: {
    backgroundColor: "#333745",
    padding: "5%",
    marginVertical: "2%",
    marginHorizontal: "5%",
    width: "90%",
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#EEF5DB",
    fontSize: 20,
  },
});
