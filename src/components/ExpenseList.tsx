import { useEffect, useState } from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosApi from "../api/axiosApi";

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<{ id: string; category: string; amount: number }[]>([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await axiosApi.get("/expenses.json");
      if (response.data) {
        setExpenses(Object.entries(response.data).map(([id, data]) => ({ id, ...data })));
      }
    };
    fetchExpenses();
  }, []);

  const deleteExpense = async (id: string) => {
    await axiosApi.delete(`/expenses/${id}.json`);
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <List>
      {expenses.map((expense) => (
        <ListItem key={expense.id}>
          <ListItemText primary={`${expense.category}: ${expense.amount} сом`} />
          <IconButton onClick={() => deleteExpense(expense.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ExpenseList;
