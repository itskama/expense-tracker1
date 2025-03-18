import { useEffect, useState } from "react";
import axiosApi from "../api/axiosApi";

const Stats: React.FC = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const incomeResponse = await axiosApi.get("/incomes.json");
      const expenseResponse = await axiosApi.get("/expenses.json");

      let incomeTotal = 0;
      let expenseTotal = 0;

      if (incomeResponse.data) {
        incomeTotal = Object.values(incomeResponse.data).reduce((sum, { amount }) => sum + amount, 0);
      }
      if (expenseResponse.data) {
        expenseTotal = Object.values(expenseResponse.data).reduce((sum, { amount }) => sum + amount, 0);
      }

      setTotalIncome(incomeTotal);
      setTotalExpense(expenseTotal);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Статистика</h2>
      <p>Доходы: {totalIncome} сом</p>
      <p>Расходы: {totalExpense} сом</p>
      <p>Баланс: {totalIncome - totalExpense} сом</p>
    </div>
  );
};

export default Stats;
