import { useEffect, useState } from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosApi from "../api/axiosApi";

const IncomeList: React.FC = () => {
  const [incomes, setIncomes] = useState<{ id: string; category: string; amount: number }[]>([]);

  useEffect(() => {
    const fetchIncomes = async () => {
      const response = await axiosApi.get("/incomes.json");
      if (response.data) {
        setIncomes(Object.entries(response.data).map(([id, data]) => ({ id, ...data })));
      }
    };
    fetchIncomes();
  }, []);

  const deleteIncome = async (id: string) => {
    await axiosApi.delete(`/incomes/${id}.json`);
    setIncomes((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <List>
      {incomes.map((income) => (
        <ListItem key={income.id}>
          <ListItemText primary={`${income.category}: ${income.amount} сом`} />
          <IconButton onClick={() => deleteIncome(income.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default IncomeList;
