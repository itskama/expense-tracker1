import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddIncome from "../pages/AddIncome";
import AddExpense from "../pages/AddExpense";
import Incomes from "../pages/Incomes";
import Expenses from "../pages/Expenses";
import Statistics from "../pages/Statistics";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Statistics />} />
        <Route path="/add-income" element={<AddIncome />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/incomes" element={<Incomes />} />
        <Route path="/expenses" element={<Expenses />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
