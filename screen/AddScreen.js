import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  Platform,
  Pressable,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useState, useContext } from "react";
import DatePicker from "@react-native-community/datetimepicker";
import PageButton from "../component/ui/PageButton";
import { ExpensesContext } from "../context/expenses-context";
import { AntDesign } from "@expo/vector-icons";

function AddScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState(0);
  const [date, setDate] = useState(new Date());
  const [datePicker, setDatePicker] = useState(false);
  const expensesContext = useContext(ExpensesContext);
  const expenses = expensesContext.expense;

  const id = Math.trunc(
    expenses.length +
      ((Math.floor(Math.random() * 100) + 1) *
        (Math.floor(Math.random() * 100) + 1)) /
        (Math.floor(Math.random() * 100) + 1)
  );

  function titleInputHandler(enteredTitle) {
    console.log("Title: " + enteredTitle);
    setTitle(enteredTitle);
  }

  function costInputHandler(enteredCost) {
    console.log("Cost: " + enteredCost);
    setCost(+enteredCost);
  }

  function dateInputHandler(event, value) {
    console.log("Date: " + value.toDateString());
    setDate(value);
    setDatePicker(false);
  }

  function addExpense() {
    if (title.length <= 0) {
      Alert.alert("Expense is empty", "Expense cannot be empty", [
        {
          text: "Ok",
          onPress: () => console.log("Ok pressed"),
        },
      ]);
    } else if (cost < 0) {
      Alert.alert("Cost is negative value", "Cost cannot be a negative value", [
        {
          text: "Ok",
          onPress: () => console.log("Ok pressed"),
        },
      ]);
    } else if (cost === 0) {
      Alert.alert("Cost is 0", "Cost cannot be 0", [
        {
          text: "Ok",
          onPress: () => console.log("Ok pressed"),
        },
      ]);
    } else if (isNaN(cost)) {
      Alert.alert("Cost is not a number", "Cost must be a number", [
        {
          text: "Ok",
          onPress: () => console.log("Ok pressed"),
        },
      ]);
    } else {
      expensesContext.addExpense(id, title, cost, date);
      console.log("Expense: " + title);
      console.log("Date: " + date);
      console.log("ID: " + id);
      console.log("Cost: " + cost);
      console.log("Expenses in: ", expensesContext.expense);
      navigation.navigate("All");
    }
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Expense</Text>
          <TextInput
            placeholder="Expense"
            placeholderTextColor="#4C5C68"
            alignItems="center"
            style={styles.titleInput}
            onChangeText={titleInputHandler}
          />
          <Text style={styles.label}>Cost</Text>
          <TextInput
            placeholder="0.00"
            placeholderTextColor="#4C5C68"
            keyboardType="numeric"
            alignItems="center"
            style={styles.titleInput}
            onChangeText={costInputHandler}
          />
          <View style={styles.dateInput}>
            <Text style={styles.dateText}>{date.toDateString()}</Text>
            <Pressable onPress={() => setDatePicker(true)}>
              <AntDesign name="calendar" size={24} color="#EEF5DB" />
            </Pressable>
          </View>

          {datePicker && (
            <DatePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={dateInputHandler}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <PageButton onPress={addExpense}>Add expense</PageButton>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default AddScreen;

const deviceHeight = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    marginTop: deviceHeight * 0.05,
  },
  inputContainer: {
    flex: 8,
    alignItems: "center",
    width: "90%",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "300",
    color: "#333745",
    alignItems: "flex-start",
  },
  titleInput: {
    textAlign: "center",
    backgroundColor: "#333745",
    color: "#EEF5DB",
    width: "90%",
    borderRadius: 20,
    fontSize: 20,
    padding: "5%",
    margin: "1%",
    alignItems: "center",
  },
  dateInput: {
    flexDirection: "row",
    textAlign: "center",
    backgroundColor: "#333745",
    color: "#EEF5DB",
    width: "90%",
    borderRadius: 20,
    fontSize: 20,
    padding: "5%",
    margin: "1%",
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    fontSize: 20,
    color: "#EEF5DB",
    marginHorizontal: "5%",
  },
});

//colors #333745 #E63462 #FE5F55 #C7EFCF #EEF5DB
