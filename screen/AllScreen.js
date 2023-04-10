import { FlatList, StyleSheet, View, Dimensions, Alert } from "react-native";
import { useState, useContext, useEffect } from "react";
import PageButton from "../component/ui/PageButton";
import { AntDesign } from "@expo/vector-icons";
import AddExpenses from "../component/add/AddExpenses";
import { ExpensesContext } from "../context/expenses-context";

function AllScreen({ navigation }) {
  const expensesContext = useContext(ExpensesContext);
  const expenses = expensesContext.expense;
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    setTotalCost(expenses.reduce((acc,cur)=> acc+ cur.price, 0));
    console.log(totalCost);
  }, [onAdd, onDelete]);

  function onAdd() {
    navigation.navigate("Add");
  }
  function onEdit(id) {
    navigation.navigate("Edit", { editId: id });
    console.log("Edit ID`: " + id);
  }

  function onDelete(id) {
    console.log("delete");
    Alert.alert(
      "Delete item with ID of " + id,
      "Are you sure you want to delete expense?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            console.log("Ok " + id);
            expensesContext.deleteExpense(id);
          },
        },
      ]
    );
  }
  return (
    <View style={styles.container}>
      <PageButton onPress={onAdd}>
        <AntDesign name="plus" size={20} color={"#EEF5DB"} />
      </PageButton>
      <PageButton>
        Total Cost: RM{totalCost.toFixed(2)}
      </PageButton>
      <View style={styles.expenseList}>
        <FlatList
          data={expensesContext.expense}
          renderItem={(itemData) => {
            return (
              <AddExpenses
                title={itemData.item.title}
                id={itemData.item.id}
                price={itemData.item.price}
                date={itemData.item.date}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
        />
      </View>
    </View>
  );
}
export default AllScreen;

const deviceHeight = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    marginTop: deviceHeight * 0.05,
  },
  expenseList: {
    flex: 1,
    flexDirection: "row",
  },
});
