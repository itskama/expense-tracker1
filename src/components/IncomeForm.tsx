import { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import axiosApi from "../api/axiosApi";

const IncomeForm: React.FC = () => {
  const [amount, setAmount] = useState<string>(""); 
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]); 
  const [category, setCategory] = useState<string>(""); 
  const [error, setError] = useState<string>(""); 
  const [success, setSuccess] = useState<string>(""); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosApi.get("/incomeCategories.json");

        
        if (!response.data) {
          const defaultCategories = [
            { name: "Зарплата" },
            { name: "Дополнительный доход" },
            { name: "Инвестиции" },
          ];

          await Promise.all(
            defaultCategories.map(async (category) => {
              await axiosApi.post("/incomeCategories.json", category);
            })
          );
        }

        const categoriesResponse = await axiosApi.get("/incomeCategories.json");
        if (categoriesResponse.data) {
          setCategories(
            Object.entries(categoriesResponse.data).map(([id, { name }]) => ({ id, name }))
          );
        }
      } catch (err) {
        console.error("Ошибка при загрузке категорий", err);
      }
    };

    fetchCategories();
  }, []);


  const addIncome = async () => {
    if (!amount || !category) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }
    
    try {
      await axiosApi.post("/incomes.json", { category, amount: parseFloat(amount) });
      setAmount("");
      setCategory("");
      setError(""); 
      setSuccess("Доход успешно добавлен!");
    } catch (err) {
      console.error("Ошибка при добавлении дохода:", err);
      setError("Ошибка при добавлении дохода. Попробуйте еще раз.");
      setSuccess(""); 
    }
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
      
      <Button onClick={addIncome} variant="contained" color="primary">
        Добавить доход
      </Button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default IncomeForm;
