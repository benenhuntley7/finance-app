import React from "react";

 const optionsCategory = [
  {
    name: "Groceries",
  },
  {
    name: "Living",
  },
  {
    name: "Subscriptions",
  },
  {
    name: "Vehicle",
  },
];

export const CategorySelect = ({ inputClass }: { inputClass?: string; }) => {
  return (
    <>
      <select className={inputClass} id="categorySelect" name="category">
        {optionsCategory.map((category, index) => (
          <option className="bg-slate-400 " key={index} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </>
  );
};
