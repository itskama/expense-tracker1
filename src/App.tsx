import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"
import Categories from "./pages/Categories";
import Incomes from "./pages/Incomes";
import Expenses from "./pages/Expenses";
import Statistics from "./pages/Statistics";
import { Link } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <div className="center-container">
        <h1>Калькулятор расходов и доходов</h1>
        <nav>
          <ul>
            <li><Link to="/categories">Add Categories</Link></li>
            <li><Link to="/incomes">Incomes</Link></li>
            <li><Link to="/expenses">Expenses</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Statistics />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/incomes" element={<Incomes />} />
          <Route path="/expenses" element={<Expenses />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
