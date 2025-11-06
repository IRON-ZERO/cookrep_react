import {createBrowserRouter} from "react-router";
import App from "./App";
import RecipeUpload from "./pages/recipe/RecipeUpload";
import RecipeList from "./pages/recipe/RecipeList.jsx";
import RecipeDetail from "./pages/recipe/RecipeDetail.jsx";
import RecipeEdit from "./pages/recipe/RecipeEdit.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/upload",
        element: <RecipeUpload/>
      },
      {
        path: "/mypage/recipes",
        element: <RecipeList/>
      },
      {
        path: "/mypage/recipe/:recipeId",
        element: <RecipeDetail/>
      },
      {
        path: "/mypage/recipe/edit/:recipeId",
        element: <RecipeEdit/>
      }
    ],
  },
]);
