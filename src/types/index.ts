export interface TRecipe {
  id: string;
  title: string;
  description: string;
  category: string;
  ingredients: string[];
  instructions: string[];
  image: string;
  userId: string;
  userAvatar: string;
  userName: string;
  servings: string;
  prepTime: string;
  createdAt: string;
}

export interface TBody {
  category: string;
  description: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  servings: string;
  title: string;
  userAvatar: string;
  userId: string;
  userName: string;
}
