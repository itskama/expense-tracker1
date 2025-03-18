import { useState } from "react";
import { TextField, Button } from "@mui/material";
import axiosApi from "../api/axiosApi";

interface CategoryFormProps {
  type: "income" | "expense";
}

const CategoryForm: React.FC<CategoryFormProps> = ({ type }) => {
  const [name, setName] = useState("");

  const addCategory = async () => {
    if (!name) return;
    await axiosApi.post(`/${type}Categories.json`, { name });

    setName(""); 
  };

  return (
    <div>
      <TextField
        label={`Название категории (${type === "income" ? "доход" : "расход"})`}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={addCategory} variant="contained">
        Добавить
      </Button>
    </div>
  );
};

export default CategoryForm;
