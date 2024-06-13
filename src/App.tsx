import { Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import Recipes from "./routes/recipes";
import MaxWidthWrapper from "./components/max-width-wrapper";
import Nav from "./components/nav";
import Categories from "./routes/categories";
import Recipe from "./routes/recipe";
import Category from "./routes/category";
import CreateRecipe from "./routes/create-recipe";

export default function App() {
  return (
    <MaxWidthWrapper>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<Recipe />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={<Category />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
      </Routes>
    </MaxWidthWrapper>
  );
}
