import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

export default function ({
  search,
  setSearch,
  category,
  setCatgory,
  brand,
  setBrand,
  price,
  SetPrice,
  handleBrandChange,
  handleCategoryChange,
}) {
  const { categoryOnlyData, brandOnlyData } = useContext(DataContext);

  return (
    <div className="bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block">
      <input
        type="text"
        placeholder="search"
        className="bg-white p-2 rounded-md border-green-400 border-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* category */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {categoryOnlyData.map((item, i) => {
          return (
            <div key={i} className="flex gap-2">
              <input
                type="checkbox"
                name={item}
                checked={category === item}
                value={item}
                onChange={handleCategoryChange}
              />
              <button className="cursor-pointer uppercase">{item}</button>
            </div>
          );
        })}
      </div>
      {/* brand */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Brand</h1>
      <select
        name=""
        id=""
        className="bg-white w-full border-gray-200 border-2 rounded-md"
        value={brand}
        onChange={handleBrandChange}
      >
        {brandOnlyData?.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item.toUpperCase()}
            </option>
          );
        })}
      </select>
      {/* Price */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Price</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="">
          Price Range:${price[0]} - ${price[1]}
        </label>
        <input
          type="range"
          name=""
          id=""
          min="0"
          max="5000"
          value={price[1]}
          onChange={(e) => SetPrice([price[0], Number(e.target.value)])}
        />
      </div>
      <button
        className="bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer"
        onClick={() => {
          setSearch("");
          setBrand("ALL");
          setCatgory("ALL");
          SetPrice([0, 5000]);
        }}
      >
        {" "}
        Reset Filters
      </button>
    </div>
  );
}
