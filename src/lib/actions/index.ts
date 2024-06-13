import axios from "axios";
import type { TRecipe, TBody } from "../../types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getRecipes = async (): Promise<TRecipe[]> => {
  const data = await axios
    .get(`${BASE_URL}/recipes`)
    .then((res) => res.data)
    .catch((error) => error);
  return data;
};

export const getRecipesByCategory = async (
  category: string
): Promise<TRecipe[]> => {
  const data = await axios
    .get(`${BASE_URL}/recipes/category/${category}`)
    .then((res) => res.data)
    .catch((error) => error);
  return data;
};

export const getRecipe = async (id: string): Promise<TRecipe> => {
  const data = await axios
    .get(`${BASE_URL}/recipes/${id}`)
    .then((res) => res.data)
    .catch((error) => error);
  return data;
};

export const createRecipe = async (body: TBody) => {
  const data = await axios
    .post(`${BASE_URL}/recipes/add-recipe`, body)
    .then((res) => res.data)
    .catch((error) => console.log(error));
  return data;
};
