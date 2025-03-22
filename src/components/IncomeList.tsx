import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosApi from "../api/axiosApi";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const Stats: React.FC = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenses, setExpenses] = useState<{ id: string; category: string; amount: number }[]>([]);
  const [incomes, setIncomes] = useState<{ id: string; category: string; amount: number }[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const incomeResponse = await axiosApi.get("/incomes.json");
      let incomeTotal = 0;
      if (incomeResponse.data) {
        setIncomes(Object.entries(incomeResponse.data).map(([id, data]) => ({ id, ...data })));
        incomeTotal = Object.values(incomeResponse.data).reduce(
          (sum, { amount }) => sum + amount,
          0
        );
      }
      setTotalIncome(incomeTotal);

      const expenseResponse = await axiosApi.get("/expenses.json");
      if (expenseResponse.data) {
        setExpenses(Object.entries(expenseResponse.data).map(([id, data]) => ({ id, ...data })));
        const totalExpense = Object.values(expenseResponse.data).reduce(
          (sum, { amount }) => sum + amount,
          0
        );
        setTotalExpense(totalExpense);
      }

      const categoryResponse = await axiosApi.get("/incomeCategories.json");
      if (categoryResponse.data) {``
        setCategories(
          Object.entries(categoryResponse.data).map(([id, { name }]) => ({ id, name }))
        );
      } else {
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
    };

    fetchData();
  }, []);

  const addIncome = async () => {
    if (!amount || !category) return;
    await axiosApi.post("/incomes.json", { category, amount: parseFloat(amount) });
    setAmount("");
    setCategory("");
    const incomeResponse = await axiosApi.get("/incomes.json");
    if (incomeResponse.data) {
      setIncomes(Object.entries(incomeResponse.data).map(([id, data]) => ({ id, ...data })));
    }
  };

  const deleteIncome = async (id: string) => {
    await axiosApi.delete(`/incomes/${id}.json`);
    setIncomes((prev) => prev.filter((item) => item.id !== id));
  };

  const addExpense = async () => {
    if (!amount || !category) return;
    await axiosApi.post("/expenses.json", { category, amount: parseFloat(amount) });
    setAmount("");
    setCategory("");
    const expenseResponse = await axiosApi.get("/expenses.json");
    if (expenseResponse.data) {
      setExpenses(Object.entries(expenseResponse.data).map(([id, data]) => ({ id, ...data })));
    }
  };

  const deleteExpense = async (id: string) => {
    await axiosApi.delete(`/expenses/${id}.json`);
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const expenseData = categories.map((cat) => {
    const categoryExpenses = expenses
      .filter((expense) => expense.category === cat.name)
      .reduce((sum, expense) => sum + expense.amount, 0);
    return { name: cat.name, value: categoryExpenses };
  });

  const incomeData = categories.map((cat) => {
    const categoryIncomes = incomes
      .filter((income) => income.category === cat.name)
      .reduce((sum, income) => sum + income.amount, 0);
    return { name: cat.name, value: categoryIncomes };
  });

  const COLORS = ['#4caf50', '#ff9800', '#2196f3'];

  return (
    <div>
      <h2>Статистика</h2>
      <p>Доходы: {totalIncome} сом</p>
      <p>Расходы: {totalExpense} сом</p>
      <p>Баланс: {totalIncome - totalExpense} сом</p>

      <PieChart width={400} height={400}>
        <Pie
          data={incomeData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
        >
          {incomeData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      

      <div>
        <h3>Добавить доход</h3>
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
      </div>

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

      
    </div>
  );
};

export default Stats;
