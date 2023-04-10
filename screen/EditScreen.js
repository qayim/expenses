import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useState, useContext } from "react";
import { useRoute } from "@react-navigation/native";
import { ExpensesContext } from "../context/expenses-context";
import DatePicker from "@react-native-community/datetimepicker";
import PageButton from "../component/ui/PageButton";
import { AntDesign } from "@expo/vector-icons";

function EditScreen({ navigation }) {
  const route = useRoute();
  const editId = route.params.editId;
  const expensesContext = useContext(ExpensesContext);
  const expenses = expensesContext.expense;
  const expenseEdit = expenses.find((expense) => expense.id === editId);
  const [title, setTitle] = useState(expenseEdit.title);
  const [cost, setCost] = useState(expenseEdit.price);
  const [date, setDate] = useState(expenseEdit.date);
  const [datePicker, setDatePicker] = useState(false);

  function editTitleInputHandler(enteredEditTitle) {
    console.log("Edit Title: " + enteredEditTitle);
    setTitle(enteredEditTitle);
  }

  function editCostInputHandler(enteredEditCost) {
    console.log("Edit Cost: " + enteredEditCost);
    setCost(+enteredEditCost);
  }

  function editDateInputHandler(event, value) {
    console.log("Date: " + value.toDateString());
    setDate(value);
    setDatePicker(false);
  }

  function editExpense() {
    if (cost < 0) {
      Alert.alert("Cost is negative value", "Cost cannot be a negative value", [
        {
          text: "Ok",
          onPress: () => console.log("Ok pressed"),
        },
      ]);
    } else if ((cost === 0)) {
      Alert.alert("Cost is 0", "Cost cannot be 0", [
        {
          text: "Ok",
          onPress: () => console.log("Ok pressed"),
        },
      ]);
    } else {
      expensesContext.editExpense(editId, title, cost, date);
      console.log("Expense edited: " + title);
      console.log("Date edited: " + date);
      console.log("Cost edited: " + cost);
      console.log("Expenses edited in: ", expensesContext.expense);
      navigation.navigate("All");
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Expense</Text>
          <TextInput
            placeholder={expenseEdit.title}
            placeholderTextColor="#4C5C68"
            alignItems="center"
            style={styles.titleInput}
            onChangeText={editTitleInputHandler}
          />
          <Text style={styles.label}>Cost</Text>
          <TextInput
            placeholder={"RM" + expenseEdit.price.toFixed(2)}
            placeholderTextColor="#4C5C68"
            keyboardType="numeric"
            alignItems="center"
            style={styles.titleInput}
            onChangeText={editCostInputHandler}
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
              onChange={editDateInputHandler}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <PageButton onPress={editExpense}>Edit expense</PageButton>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default EditScreen;

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
