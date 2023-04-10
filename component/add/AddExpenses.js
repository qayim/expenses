import { Text, StyleSheet, View, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

function AddExpenses({ onDelete, onEdit, title, id, price, date }) {
  let priceFontSize = 16;

  if (price > 99 && price < 999) {
    priceFontSize = 14;
  } else if (price > 999 && price < 9999) {
    priceFontSize = 12;
  } else if(price>9999){
    priceFontSize = 8;
  }
  return (
    <View style={{ flex: 1 }}>
      <Pressable onLongPress={onEdit.bind(this, id)}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.dateText}>{date.toDateString()}</Text>
          </View>

          <View style={styles.iconContainer}>
            <View style={styles.priceContainer}>
              <Text style={[styles.priceText, { fontSize: priceFontSize }]}>
                RM{price.toFixed(2)}
              </Text>
            </View>
            <Pressable onPress={onDelete.bind(this, id)} style={styles.button}>
              <View style={styles.deleteIcon}>
                <AntDesign name="delete" size={30} color="#D17B88" />
              </View>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default AddExpenses;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EEF5DB",
    borderWidth: 5,
    borderColor: "#333745",
    width: "95%",
    margin: "2%",
    borderRadius: 20,
    flexDirection: "row",
  },
  textContainer: {
    flex: 8,
    margin: "2%",
    justifyContent: "flex-start",
  },
  iconContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    alignContent: "center",
    margin: "5%",
  },
  priceContainer: {
    width: "120%",
    height: "80%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#333745",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  priceText: {
    color: "#333745",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  editIcon: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#333745",
    padding: "5%",
    margin: "2%",
  },
  deleteIcon: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#D17B88",
    padding: "5%",
    margin: "2%",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333745",
    marginHorizontal: "5%",
    marginTop: "3%",
  },
  dateText: {
    fontSize: 15,
    fontWeight: "300",
    color: "#333745",
    marginHorizontal: "5%",
    marginBottom: "3%",
  },
});

//colors #333745 #E63462 #FE5F55 #C7EFCF #EEF5DB
