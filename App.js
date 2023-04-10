import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExpensesContextProvider from "./context/expenses-context";
import AddScreen from "./screen/AddScreen";
import AllScreen from "./screen/AllScreen";
import EditScreen from "./screen/EditScreen";
import RecentScreen from "./screen/RecentScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ExpensesContextProvider>
      <NavigationContainer style={styles.container}>
        <Stack.Navigator
          screenOptions={{
            contentStyle: { backgroundColor: "#EEF5DB" },
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="All"
            component={AllScreen}
            options={{ title: "Expenses Tracker" }}
          />
          <Stack.Screen
            name="Add"
            component={AddScreen}
            options={{ title: "Add Expenses" }}
          />
          <Stack.Screen
            name="Edit"
            component={EditScreen}
            options={{ title: "Edit Expenses" }}
          />
          <Stack.Screen
            name="Recent"
            component={RecentScreen}
            options={{ title: "Recent Expenses" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//colors #820933 #d84797 #d2fdff #3abeff #26ffe6
