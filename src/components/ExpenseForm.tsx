import { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import axiosApi from "../api/axiosApi";

const ExpenseForm: React.FC = () => {
  const [amount, setAmount] = useState<string>("");
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axiosApi.get("/expenseCategories.json");
      if (!response.data) {
        const defaultCategories = [
          { name: "Продукты" },
          { name: "Транспорт" },
          { name: "Развлечения" },
        ];
        await Promise.all(
          defaultCategories.map(async (category) => {
            await axiosApi.post("/expenseCategories.json", category);
          })
        );
      }

      const categoriesResponse = await axiosApi.get("/expenseCategories.json");
      if (categoriesResponse.data) {
        setCategories(
          Object.entries(categoriesResponse.data).map(([id, { name }]) => ({ id, name }))
        );
      }
    };

    fetchCategories();
  }, []);

  const addExpense = async () => {
    if (!amount || !category) return;
    await axiosApi.post("/expenses.json", { category, amount: parseFloat(amount) });
    setAmount("");
    setCategory("");
  };

  return (
    <div>
      <FormControl fullWidth margin="normal">
        <InputLabel>Категория</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Категория"
          required
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.name}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Сумма"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      <Button onClick={addExpense} variant="contained" color="primary">
        Добавить расход
      </Button>
    </div>
  );
};

export default ExpenseForm;
