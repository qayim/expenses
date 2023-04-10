import { createContext, useState } from "react";

export const ExpensesContext = createContext({
  expense: [],
  addExpense: (id, title, price, date) => {},
  deleteExpense: (id) => {},
  editExpense: (id, newTitle, newPrice, newDate) => {},
});

function ExpensesContextProvider({ children }) {
  const [expenses, setExpenses] = useState([]);

  function addExpense(id, title, price, date) {
    setExpenses((currentExpenses) => [
      ...currentExpenses,
      { id: id, title: title, price: price, date: new Date(date) },
    ]);
  }
  function deleteExpense(id) {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expenses) => expenses.id !== id)
    );
    console.log("Delete context: " + id)
  }
  function editExpense(id, newTitle, newPrice, newDate) {
    const newExpense = expenses.map((expense) => {
      if (expense.id === id) {
        return {
          ...expense,
          title: newTitle,
          price: newPrice,
          date: new Date(newDate),
        };
      }
      return expense;
    });
    setExpenses(newExpense);
  }

  const value = {
    expense: expenses,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    editExpense: editExpense,
  };
  
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
