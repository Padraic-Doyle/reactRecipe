import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

const App = () => {
  const APP_ID = "4ce85818";
  const APP_KEY = "ce6de0b928b2294f0a9d2c02bfebaae0";

  const [recipe, setRecipe] = useState([]);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("chicken");

  useEffect(() => {
    getReceipes();
  }, [input]);

  const getReceipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${input}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    console.log(data.hits);
    setRecipe(data.hits);
  };

  const change = e => {
    setSearch(e.target.value);
  };

  const submit = e => {
    e.preventDefault();
    setInput(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form onSubmit={submit} className="search-form">
        <input
          type="text"
          className="search-bar"
          value={search}
          onChange={change}
        />

        <button type="submit" className="search-button">
          search
        </button>
      </form>
      <div className="recipes">
        {recipe.map(recipe => (
          <Recipe
            title={recipe.recipe.label}
            key={recipe.recipe.label}
            calories={Math.floor(recipe.recipe.calories)}
            ingredients={recipe.recipe.ingredients}
            image={recipe.recipe.image}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
