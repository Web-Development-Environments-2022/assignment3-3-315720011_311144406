import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/search/results",
    name: "searchResults",
    component: () => import("./pages/SearchResultsPage"),
  },
  {
    path: "/recipe/information/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/user/createrecipe",
    name: "createRecipe",
    component: () => import("./pages/CreateRecipePage"),
  },
  {
    path: "/user/myrecipes",
    name: "myRecipes",
    component: () => import("./pages/MyRecipesPage"),
  },
  {
    path: "/user/favorites",
    name: "favorites",
    component: () => import("./pages/FavoritesPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
