import React from "react";
import CategoryForm from "../components/CategoryForm";

const Categories: React.FC = () => {
  return (
    <div>
      <h2>Управление категориями</h2>
      
      <div style={{ marginBottom: "2rem" }}>
        <h3>Категории доходов</h3>
        <CategoryForm type="income" />
      </div>

      <div>
        <h3>Категории расходов</h3>
        <CategoryForm type="expense" />
      </div>
    </div>
  );
};

export default Categories;